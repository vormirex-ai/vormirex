#!/usr/bin/env python3
import sys
import subprocess
import argparse
import shutil

# Colors
GREEN = "\033[92m"
BLUE = "\033[94m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"

def log_info(msg):
    print(f"{BLUE}➔ {msg}{RESET}")

def log_success(msg):
    print(f"{GREEN}✔ {msg}{RESET}")

def log_warning(msg):
    print(f"{YELLOW}⚠ {msg}{RESET}")

def log_error(msg):
    print(f"{RED}✘ {msg}{RESET}")

def get_compose_cmd():
    """Determine whether to use 'docker compose' or 'docker-compose'."""
    if shutil.which("docker-compose"):
        return ["docker-compose"]
    if shutil.which("docker"):
        return ["docker", "compose"]
    log_error("Neither 'docker-compose' nor 'docker' commands were found in your PATH.")
    log_warning("Please make sure Docker is installed and running.")
    return None

def run_cmd(cmd, cwd=None):
    log_info(f"Executing: {' '.join(cmd)}")
    try:
        res = subprocess.run(cmd, cwd=cwd)
        if res.returncode != 0:
            log_error(f"Command failed with exit code {res.returncode}")
            sys.exit(res.returncode)
        log_success("Command executed successfully!")
    except KeyboardInterrupt:
        log_warning("\nExecution interrupted by user.")
        sys.exit(0)
    except Exception as e:
        log_error(f"Failed to execute command: {e}")
        sys.exit(1)

def dev():
    compose = get_compose_cmd()
    if not compose:
        sys.exit(1)
    log_info("Starting Local Development Stack...")
    run_cmd(compose + ["-f", "docker-compose.yml", "up", "--build", "-d"])

def prod():
    compose = get_compose_cmd()
    if not compose:
        sys.exit(1)
    log_info("Building and Starting Production Stack...")
    run_cmd(compose + ["-f", "docker-compose.prod.yml", "build", "--no-cache"])
    run_cmd(compose + ["-f", "docker-compose.prod.yml", "up", "-d"])

def down():
    compose = get_compose_cmd()
    if not compose:
        sys.exit(1)
    log_info("Tearing down all Docker Compose stacks...")
    run_cmd(compose + ["-f", "docker-compose.yml", "down"])
    run_cmd(compose + ["-f", "docker-compose.prod.yml", "down"])

def logs(service):
    compose = get_compose_cmd()
    if not compose:
        sys.exit(1)
    cmd = compose + ["logs", "-f"]
    if service:
        cmd.append(service)
    run_cmd(cmd)

def backend_build():
    log_info("Building backend...")
    run_cmd(["npm", "run", "build"], cwd="services/backend")

def backend_test():
    log_info("Running backend tests...")
    run_cmd(["npm", "run", "test"], cwd="services/backend")

def backend_swagger():
    log_info("Generating backend Swagger docs...")
    run_cmd(["npm", "run", "swagger"], cwd="services/backend")

def postman_update():
    log_info("Running Postman update script...")
    run_cmd(["node", "update_postman.js"])

def interactive_menu():
    print(f"\n{BOLD}{YELLOW}⚡ VORMIREX CENTRAL CONTROL PANEL ⚡{RESET}\n")
    print("1. Start Dev Container Stack   (docker compose up --build -d)")
    print("2. Tear Down Containers        (docker compose down)")
    print("3. Tail Containers Logs        (docker compose logs -f)")
    print("4. Build Backend               (npm run build)")
    print("5. Run Backend Tests           (npm run test)")
    print("6. Generate Swagger Docs       (npm run swagger)")
    print("7. Sync Postman Collection     (node update_postman.js)")
    print("8. Start Prod Container Stack  (docker-compose.prod.yml)")
    print("9. Exit")

    try:
        choice = input(f"\n{BOLD}Select an option [1-9]: {RESET}").strip()
        if choice == '1':
            dev()
        elif choice == '2':
            down()
        elif choice == '3':
            logs(None)
        elif choice == '4':
            backend_build()
        elif choice == '5':
            backend_test()
        elif choice == '6':
            backend_swagger()
        elif choice == '7':
            postman_update()
        elif choice == '8':
            prod()
        elif choice == '9':
            log_info("Goodbye!")
            sys.exit(0)
        else:
            log_error("Invalid option")
    except KeyboardInterrupt:
        print()
        sys.exit(0)

def main():
    parser = argparse.ArgumentParser(description="Vormirex Central Command Utility")
    parser.add_argument("command", nargs="?", help="Command to run: dev, prod, down, logs, test, build, swagger, postman")
    parser.add_argument("--service", help="Target service for logs (e.g. backend, frontend)")
    args = parser.parse_args()

    if not args.command:
        interactive_menu()
        return

    cmd = args.command.lower()
    if cmd == "dev":
        dev()
    elif cmd == "prod":
        prod()
    elif cmd == "down":
        down()
    elif cmd == "logs":
        logs(args.service)
    elif cmd == "build":
        backend_build()
    elif cmd == "test":
        backend_test()
    elif cmd == "swagger":
        backend_swagger()
    elif cmd == "postman":
        postman_update()
    else:
        log_error(f"Unknown command: {cmd}")
        print("Available commands: dev, prod, down, logs, build, test, swagger, postman")
        sys.exit(1)

if __name__ == "__main__":
    main()
