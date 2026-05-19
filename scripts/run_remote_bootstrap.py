#!/usr/bin/env python3
"""SSH: curl + server-bootstrap.sh. Set VPS_PASS in environment."""
import os
import sys
import time

import paramiko

HOST = os.environ.get("VPS_HOST", "186.246.1.187")
USER = os.environ.get("VPS_USER", "root")
PASSWORD = os.environ.get("VPS_PASS")
BOOTSTRAP_URL = "https://raw.githubusercontent.com/amirko228/jelez-beton/main/scripts/server-bootstrap.sh"


def main() -> int:
    if not PASSWORD:
        print("Set VPS_PASS (root password).", file=sys.stderr)
        return 2

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting {USER}@{HOST}...")
    client.connect(
        HOST,
        username=USER,
        password=PASSWORD,
        timeout=90,
        allow_agent=False,
        look_for_keys=False,
    )

    cmd = f"set -e; curl -fsSL {BOOTSTRAP_URL} | bash"
    print("Running bootstrap (long build, 10–25 min)...")
    transport = client.get_transport()
    chan = transport.open_session()
    chan.exec_command(cmd)
    chan.settimeout(3600)

    buf = []
    while True:
        if chan.recv_ready():
            chunk = chan.recv(65536).decode(errors="replace")
            sys.stdout.write(chunk)
            sys.stdout.flush()
            buf.append(chunk)
        if chan.exit_status_ready():
            while chan.recv_ready():
                chunk = chan.recv(65536).decode(errors="replace")
                sys.stdout.write(chunk)
                sys.stdout.flush()
                buf.append(chunk)
            break
        time.sleep(1)

    code = chan.recv_exit_status()
    client.close()
    print(f"\nExit code: {code}")
    return 0 if code == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
