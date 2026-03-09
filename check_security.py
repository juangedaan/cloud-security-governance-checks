#!/usr/bin/env python3

"""Simple script to simulate governance checks."""

import json


def main():
    print("Running governance checks...")
    try:
        with open("resources.json") as f:
            resources = json.load(f)
    except FileNotFoundError:
        print("resources.json not found; using default sample data.")
        resources = [{"type": "s3_bucket", "name": "example-bucket", "public": True}]

    findings = []
    for res in resources:
        if res.get("type") == "s3_bucket" and res.get("public"):
            findings.append({"resource": res.get("name"), "issue": "publicly accessible bucket"})
        if res.get("type") == "ec2_instance" and res.get("security_group_open"):
            findings.append({"resource": res.get("name"), "issue": "security group wide open"})

    print("Findings:")
    print(json.dumps(findings, indent=2))


if __name__ == "__main__":
    main()
