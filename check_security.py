#!/usr/bin/env python3

"""Simple script to simulate governance checks."""

import json


def main():
    print("Running governance checks...")
    # pretend we scanned buckets
    findings = [{"bucket": "example-bucket", "public": True}]
    print("Findings:")
    print(json.dumps(findings, indent=2))


if __name__ == "__main__":
    main()
