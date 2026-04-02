import json
import sys
import traceback
import time

def main():
    payload = json.loads(sys.argv[1])
    user_code = payload["code"]
    function_name = payload["function_name"]
    test_cases = payload["test_cases"]
    mode = payload.get("mode", "python_concept")

    if mode == "pytorch_real":
        preamble = (
            "from typing import List, Dict, Tuple, Set, Optional, Any, Union\n"
            "import torch\n"
            "import torch.nn as nn\n"
            "import torch.nn.functional as F\n"
            "from torch.utils.data import Dataset, DataLoader\n"
            "import math\n"
        )
    else:
        preamble = "from typing import List, Dict, Tuple, Set, Optional, Any, Union\n"
    full_code = preamble + user_code

    local_ns = {"__builtins__": __builtins__}
    try:
        exec(full_code, local_ns)
    except Exception as e:
        results = []
        for i in range(len(test_cases)):
            results.append({
                "test_index": i,
                "output": None,
                "time_ms": 0,
                "error": f"Compilation error: {type(e).__name__}: {str(e)}"
            })
        print(json.dumps({"results": results}))
        return

    if function_name not in local_ns:
        results = []
        for i in range(len(test_cases)):
            results.append({
                "test_index": i,
                "output": None,
                "time_ms": 0,
                "error": f"Function '{function_name}' not found in your code"
            })
        print(json.dumps({"results": results}))
        return

    func = local_ns[function_name]
    results = []

    for i, tc in enumerate(test_cases):
        inputs = tc["input"]
        start = time.perf_counter()
        try:
            if isinstance(inputs, dict):
                output = func(**inputs)
            else:
                output = func(*inputs)
            elapsed = (time.perf_counter() - start) * 1000
            serialized = make_serializable(output)
            results.append({
                "test_index": i,
                "output": serialized,
                "time_ms": round(elapsed, 2),
                "error": None
            })
        except Exception as e:
            elapsed = (time.perf_counter() - start) * 1000
            results.append({
                "test_index": i,
                "output": None,
                "time_ms": round(elapsed, 2),
                "error": f"{type(e).__name__}: {str(e)}"
            })

    print(json.dumps({"results": results}))


def make_serializable(obj):
    """Convert numpy/torch types to native Python for JSON serialization."""
    try:
        import numpy as np
        if isinstance(obj, (np.integer,)):
            return int(obj)
        if isinstance(obj, (np.floating,)):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
    except ImportError:
        pass

    try:
        import torch
        if isinstance(obj, torch.Tensor):
            return obj.detach().cpu().tolist()
    except ImportError:
        pass

    if isinstance(obj, (list, tuple)):
        return [make_serializable(x) for x in obj]
    if isinstance(obj, dict):
        return {k: make_serializable(v) for k, v in obj.items()}

    return obj


if __name__ == "__main__":
    main()
