# Cloud Security Governance Checks

A lightweight script that loads a JSON list of cloud resources (see `resources.json`) and applies simplified governance rules:
- flagging S3 buckets marked `public`
- warning if an EC2 instance has `security_group_open` set to true

This mirrors how basic IaC scanners generate findings.

```mermaid
flowchart LR
    Data[resources.json] --> Script[check_security.py]
    Script --> S3[Public S3 bucket check]
    Script --> SG[Open security group check]
    S3 --> Findings[Findings JSON]
    SG --> Findings
```

## 📂 Structure

```
cloud-security-governance-checks/
├── README.md
├── requirements.txt
├── check_security.py
└── resources.json   # sample data file used by the script
```

## 🚀 Usage

```bash
python check_security.py
```

## 📜 License

MIT License
