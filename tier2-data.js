window.TIER2_SCENARIOS = [
  {
    slug: "no-internet-access",
    title: "No Internet Access (Wi-Fi/Wired)",
    category: "Network",
    summary: "Restores local and internet connectivity for wired or wireless clients.",
    checklist: [
      { id: "link-check", title: "Confirm physical/Wi-Fi link", details: "Verify Ethernet link lights or Wi-Fi SSID/signal, then toggle Airplane Mode once." },
      { id: "adapter-reset", title: "Reset adapter state", details: "Run `ncpa.cpl`, disable/enable the active adapter, then retest browsing." },
      { id: "ip-config", title: "Validate TCP/IP config", details: "Run `ipconfig /all` and confirm valid IPv4, gateway, and DNS (not `169.254.x.x`)." },
      { id: "gateway-ping", title: "Test LAN path", details: "Run `ping <default-gateway>` to confirm local network reachability." },
      { id: "internet-ping", title: "Test internet by IP", details: "Run `ping 8.8.8.8`; success here with web failure points to DNS." },
      { id: "dns-test", title: "Test DNS resolution", details: "Run `nslookup google.com` and `ping google.com` to confirm name resolution." },
      { id: "stack-reset", title: "Reset networking stack", details: "Run `ipconfig /flushdns`, `netsh winsock reset`, and `netsh int ip reset`, then reboot." },
      { id: "upstream-check", title: "Confirm upstream outage", details: "Check router WAN status/ISP outage and compare with another device on the same network." }
    ],
    proTips: [
      "Keep a known-good Ethernet cable in your toolkit for fast isolation.",
      "If multiple devices fail, troubleshoot upstream before touching endpoints.",
      "Document IP details before resets so you can roll back static configs."
    ]
  },
  {
    slug: "vpn-fails-to-connect",
    title: "VPN Fails to Connect",
    category: "Network",
    summary: "Diagnoses tunnel failures caused by auth, client, or network policy issues.",
    checklist: [
      { id: "vpn-network-check", title: "Validate baseline connectivity", details: "Confirm internet works first (`ping 8.8.8.8` and browser test) before VPN troubleshooting." },
      { id: "vpn-time-sync", title: "Correct system time", details: "Run `w32tm /resync` or Windows time sync; cert/MFA failures are common with clock drift." },
      { id: "vpn-credentials", title: "Verify account/auth inputs", details: "Confirm UPN format, password validity, account lockout state, and MFA prompt path." },
      { id: "vpn-client-state", title: "Restart VPN client/services", details: "Exit client fully and restart required services (for example `RasMan` if applicable)." },
      { id: "vpn-endpoint", title: "Validate VPN profile settings", details: "Check server FQDN, tunnel type, split/full tunnel policy, and certificate selection." },
      { id: "vpn-firewall", title: "Rule out local network blocks", details: "Test from alternate network/hotspot to identify blocked ports/proxy interception." },
      { id: "vpn-logs", title: "Collect actionable error evidence", details: "Capture exact error code/timestamp from client logs and Event Viewer for escalation." },
      { id: "vpn-reinstall", title: "Repair client installation", details: "Update or reinstall the VPN client profile package, then retest with fresh credentials." }
    ],
    proTips: [
      "Mobile hotspot testing quickly separates local LAN blocks from client issues.",
      "Save a screenshot of the exact error code before retries overwrite logs.",
      "Check if recent password reset requires re-enrolling certificate-based VPN."
    ]
  },
  {
    slug: "cannot-access-shared-network-drives",
    title: "Cannot Access Shared Network Drives",
    category: "Network",
    summary: "Restores SMB path access and mapped drive availability.",
    checklist: [
      { id: "share-connectivity", title: "Verify server reachability", details: "Run `ping <fileserver>` and `ping <fileserver-ip>` from affected endpoint." },
      { id: "share-path", title: "Test direct UNC access", details: "Open `\\\\server\\share` directly to bypass stale mapped drive letters." },
      { id: "share-auth", title: "Validate file/share permissions", details: "Confirm NTFS + share ACL membership and effective permissions for the user." },
      { id: "share-session-clear", title: "Clear stale SMB sessions", details: "Run `net use * /delete /y`, then remove old credentials from Credential Manager." },
      { id: "share-dns", title: "Check name resolution path", details: "Run `nslookup <fileserver>` and test `\\\\<ip>\\share` to isolate DNS/NetBIOS issues." },
      { id: "share-service", title: "Confirm SMB-related services", details: "Verify Workstation/Server services are running where required on client/server." },
      { id: "share-policy", title: "Review SMB/firewall policy", details: "Check firewall and SMB version/signing policy mismatches blocking access." },
      { id: "share-remap", title: "Remap drive cleanly", details: "Recreate mapping using `net use X: \\\\server\\share /persistent:yes` after root cause is fixed." }
    ],
    proTips: [
      "Always test raw UNC first; mapped letters can hide the real failure.",
      "Use `whoami /groups` to quickly verify expected security group access.",
      "For intermittent failures, compare behavior by IP versus hostname."
    ]
  },
  {
    slug: "duplicate-ip-address-conflict",
    title: "Duplicate IP Address Conflict",
    category: "Network",
    summary: "Resolves address conflicts from static overlap or DHCP scope issues.",
    checklist: [
      { id: "dup-alert", title: "Capture conflict evidence", details: "Document duplicate IP alert details, impacted hostnames, and timestamp." },
      { id: "dup-current-ip", title: "Inspect current adapter config", details: "Run `ipconfig /all` to identify lease/static assignment and adapter MAC." },
      { id: "dup-release-renew", title: "Force new DHCP lease", details: "Run `ipconfig /release` then `ipconfig /renew` on DHCP clients." },
      { id: "dup-arp", title: "Identify conflicting host by MAC", details: "Run `arp -a` and correlate MAC OUIs to likely endpoint types." },
      { id: "dup-scope", title: "Audit DHCP scope design", details: "Verify exclusions, reservations, and dynamic pool ranges do not overlap." },
      { id: "dup-static", title: "Find static offenders", details: "Check printers/cameras/servers for manual IPs conflicting with DHCP space." },
      { id: "dup-gateway", title: "Validate network gateway uniqueness", details: "Confirm only router gateway owns the subnet gateway IP." },
      { id: "dup-monitor", title: "Verify conflict resolution", details: "Monitor DHCP logs and client events to confirm duplicate alerts stop." }
    ],
    proTips: [
      "Maintain an IP inventory for all static endpoints to prevent overlap.",
      "DHCP reservations are safer than random static assignments.",
      "Conflict storms often appear after new devices are added without planning."
    ]
  },
  {
    slug: "slow-network-performance",
    title: "Slow Network Performance",
    category: "Network",
    summary: "Pinpoints latency and throughput bottlenecks across client and LAN.",
    checklist: [
      { id: "slow-baseline", title: "Capture measurable baseline", details: "Run speed/latency tests plus `ping` and `tracert` to establish current state." },
      { id: "slow-signal", title: "Check wireless quality", details: "Verify RSSI/channel congestion and negotiated link rate for Wi-Fi users." },
      { id: "slow-cable", title: "Eliminate physical path issues", details: "Swap Ethernet cable/switch port and retest for packet loss or drops." },
      { id: "slow-adapter-driver", title: "Update adapter software", details: "Install latest NIC/WLAN driver and firmware from OEM source." },
      { id: "slow-utilization", title: "Inspect competing traffic", details: "Check Task Manager/monitoring for heavy sync, backup, or update jobs." },
      { id: "slow-duplex", title: "Validate speed/duplex negotiation", details: "Confirm endpoint and switch agree (auto/auto or matching fixed values)." },
      { id: "slow-dns", title: "Measure DNS responsiveness", details: "Run `nslookup` against current and alternate resolver to detect slow DNS path." },
      { id: "slow-segment-test", title: "Compare peer endpoint behavior", details: "Test another device on same VLAN to isolate user vs segment bottleneck." }
    ],
    proTips: [
      "Latency spikes with good throughput often point to congestion or Wi-Fi noise.",
      "Document before/after metrics so network teams can verify improvements.",
      "Keep tests consistent by using the same server target each run."
    ]
  },
  {
    slug: "computer-wont-power-on",
    title: "Computer Won't Power On",
    category: "Hardware",
    summary: "Finds power chain failures from outlet to motherboard.",
    checklist: [
      { id: "power-source", title: "Validate external power source", details: "Test wall outlet/power strip with known-good device before opening hardware." },
      { id: "power-cable", title: "Reseat power path components", details: "Reseat AC cable, PSU switch state, and adapter-to-device connection." },
      { id: "battery-state", title: "Isolate battery vs charger failure", details: "Boot on AC only (battery removed if removable) and observe response." },
      { id: "power-drain", title: "Perform static/flea power reset", details: "Disconnect power, hold power button 20-30 seconds, reconnect and retry." },
      { id: "power-leds", title: "Capture POST indicators", details: "Note LEDs, beep codes, fan spin, or diagnostic blink sequences for OEM decoding." },
      { id: "power-peripherals", title: "Boot minimal hardware state", details: "Disconnect all nonessential USB/peripherals and attempt power-on again." },
      { id: "power-psu-test", title: "Test PSU/adapter output", details: "Verify voltage with tester or known-good replacement adapter/PSU." },
      { id: "power-mainboard", title: "Escalate board-level hardware issue", details: "If no POST signs remain, route for motherboard/DC-jack service." }
    ],
    proTips: [
      "A failed dock can mimic total power failure; test direct power path.",
      "Label known-good adapters by model to reduce repeated guesswork.",
      "Capture LED code photos for vendor support tickets."
    ]
  },
  {
    slug: "blue-screen-bsod",
    title: "Blue Screen of Death (BSOD)",
    category: "OS Stability",
    summary: "Triages stop-code crashes and narrows driver or hardware root cause.",
    checklist: [
      { id: "bsod-stopcode", title: "Capture stop code and context", details: "Record BSOD code, failing module, and what changed just before crashes started." },
      { id: "bsod-safe-mode", title: "Stabilize in Safe Mode", details: "Boot Safe Mode/WinRE to make controlled rollback and repair changes." },
      { id: "bsod-driver-rollback", title: "Rollback recent changes", details: "Uninstall recent drivers/patches/apps strongly correlated with onset." },
      { id: "bsod-memory-test", title: "Test system memory integrity", details: "Run `mdsched.exe` or equivalent vendor diagnostics for RAM errors." },
      { id: "bsod-disk-check", title: "Validate storage health", details: "Run `chkdsk /scan` and review SMART metrics for media/controller issues." },
      { id: "bsod-sfc-dism", title: "Repair Windows component store", details: "Run `sfc /scannow` then `DISM /Online /Cleanup-Image /RestoreHealth`." },
      { id: "bsod-minidump", title: "Analyze minidumps", details: "Review `C:\\Windows\\Minidump` for repeating driver/module patterns." },
      { id: "bsod-firmware", title: "Apply stable firmware/chipset updates", details: "Update BIOS/chipset when known stability fixes exist for stop code pattern." }
    ],
    proTips: [
      "Frequent `MEMORY_MANAGEMENT` codes usually justify swapping RAM sticks.",
      "One recurring driver in dumps is often enough to focus remediation.",
      "Stability test after each change so you know what fixed it."
    ]
  },
  {
    slug: "system-overheating-loud-fans",
    title: "System Overheating / Loud Fans",
    category: "Hardware",
    summary: "Reduces thermal throttling and fan noise from airflow or load problems.",
    checklist: [
      { id: "heat-temp-read", title: "Measure thermal baseline", details: "Capture idle/load CPU and GPU temperatures with trusted monitoring tools." },
      { id: "heat-vents", title: "Inspect airflow path", details: "Check blocked vents, poor chassis clearance, and obstructed intake/exhaust." },
      { id: "heat-cleaning", title: "Clean dust from cooling path", details: "Remove dust from vents, heatsinks, and fans using safe compressed air." },
      { id: "heat-fan-operation", title: "Validate fan behavior", details: "Confirm all fans spin correctly and RPM telemetry responds to load." },
      { id: "heat-processes", title: "Identify thermal load source", details: "Use Task Manager to find sustained high CPU/GPU processes." },
      { id: "heat-power-plan", title: "Tune power/thermal profile", details: "Set balanced mode or OEM thermal profile to reduce unnecessary fan ramp." },
      { id: "heat-paste", title: "Assess heatsink/thermal paste condition", details: "Reseat heatsink and reapply paste where thermal transfer is degraded." },
      { id: "heat-firmware", title: "Update thermal control firmware", details: "Apply BIOS/EC firmware updates that include fan/thermal curve fixes." }
    ],
    proTips: [
      "A laptop stand can drop temperatures several degrees under sustained load.",
      "Compare temperatures against OEM specs before declaring a fault.",
      "Sudden fan ramp after update may be firmware profile related."
    ]
  },
  {
    slug: "continuous-reboot-loop",
    title: "Continuous Reboot Loop",
    category: "OS Stability",
    summary: "Breaks boot loops caused by update, driver, or startup corruption.",
    checklist: [
      { id: "loop-recovery", title: "Enter Windows Recovery", details: "Interrupt boot and enter WinRE advanced options for controlled repair." },
      { id: "loop-auto-repair", title: "Run Startup Repair first", details: "Use automatic Startup Repair to fix bootloader/startup corruption." },
      { id: "loop-safe-mode", title: "Boot Safe Mode", details: "Start minimal mode to uninstall unstable updates/drivers/services." },
      { id: "loop-update-remove", title: "Uninstall recent updates", details: "Remove latest quality/feature update linked to reboot-loop start time." },
      { id: "loop-driver-disable", title: "Disable problematic driver", details: "Use Device Manager or recovery commands to disable suspected boot driver." },
      { id: "loop-check-disk", title: "Run disk and system repairs", details: "Run `chkdsk`, `sfc /scannow`, and DISM from recovery where applicable." },
      { id: "loop-startup-items", title: "Perform clean startup test", details: "Disable non-Microsoft startup items/services to isolate boot conflict." },
      { id: "loop-restore", title: "Rollback to known-good state", details: "Use System Restore or in-place repair install if loop persists." }
    ],
    proTips: [
      "Ask what changed right before the loop; timeline is usually decisive.",
      "Keep BitLocker recovery keys available before repair operations.",
      "If loop starts after power loss, prioritize disk checks early."
    ]
  },
  {
    slug: "loud-clicking-storage-drive",
    title: "Loud Clicking from Storage Drive",
    category: "Hardware",
    summary: "Responds to probable HDD mechanical failure and protects recoverable data.",
    checklist: [
      { id: "click-stop-use", title: "Stop heavy drive activity immediately", details: "Minimize reads/writes to avoid worsening probable mechanical failure." },
      { id: "click-backup-priority", title: "Back up critical user data first", details: "Copy highest-priority files before attempting broad diagnostics." },
      { id: "click-smart", title: "Read SMART failure indicators", details: "Run SMART check and record reallocated/pending sectors and health flags." },
      { id: "click-cable-port", title: "Rule out connection instability", details: "Reseat/replace SATA-USB cable and verify stable power delivery." },
      { id: "click-no-scan", title: "Avoid destructive deep scans", details: "Do not run heavy `chkdsk /r` until backup/clone plan is established." },
      { id: "click-clone", title: "Attempt best-effort clone", details: "Use sector-aware cloning/recovery tooling to new drive where possible." },
      { id: "click-replace", title: "Replace suspect drive hardware", details: "Install replacement drive and restore from clone/backup set." },
      { id: "click-escalate", title: "Escalate for professional recovery", details: "If data is business-critical, stop DIY attempts and engage recovery vendor." }
    ],
    proTips: [
      "Clicking plus disappearing drive detection usually indicates severe failure.",
      "Prioritize user documents over full-image backup when time is limited.",
      "Recommend SSD replacement to reduce future mechanical risk."
    ]
  },
  {
    slug: "application-freezing-crashing",
    title: "Application Freezing or Crashing",
    category: "Software",
    summary: "Stabilizes apps by isolating corruption, dependencies, or resource constraints.",
    checklist: [
      { id: "app-repro", title: "Capture exact reproduction path", details: "Document precise steps, frequency, and whether all users are affected." },
      { id: "app-resources", title: "Check host resource saturation", details: "Observe CPU/RAM/disk/GPU while reproducing to identify exhaustion states." },
      { id: "app-update", title: "Update app to stable release", details: "Apply latest supported app updates/hotfixes before deeper repair." },
      { id: "app-profile-test", title: "Test with fresh profile", details: "Run under clean user profile to isolate profile-level corruption." },
      { id: "app-plugin", title: "Disable add-ins/extensions", details: "Start app in safe mode (if supported) and disable nonessential plugins." },
      { id: "app-repair", title: "Repair or reinstall application", details: "Use built-in repair workflow or clean reinstall from vendor source." },
      { id: "app-eventlogs", title: "Collect fault logs", details: "Capture Event Viewer/app logs and exception/faulting module data." },
      { id: "app-compatibility", title: "Validate runtimes/dependencies", details: "Confirm required .NET/VC++/Java runtime and compatibility settings." }
    ],
    proTips: [
      "If only one user is impacted, profile corruption is a strong suspect.",
      "Crashes tied to one document often indicate file-specific corruption.",
      "Use vendor safe-mode launch options to bypass problematic add-ins."
    ]
  },
  {
    slug: "missing-or-deleted-files",
    title: "Missing or Deleted Files",
    category: "Data Recovery",
    summary: "Locates moved/deleted files and recovers from local or cloud history.",
    checklist: [
      { id: "files-location-check", title: "Confirm expected file location", details: "Validate correct user profile, path, and drive mapping before recovery actions." },
      { id: "files-search", title: "Run broad metadata search", details: "Search by name pattern, extension, and modified date range (`*.docx`, etc.)." },
      { id: "files-recycle-bin", title: "Restore from Recycle Bin", details: "Check local Recycle Bin first for simple accidental deletion recovery." },
      { id: "files-cloud-trash", title: "Check cloud recycle/version history", details: "Review OneDrive/SharePoint recycle bins and file version history." },
      { id: "files-permissions", title: "Validate access/security context", details: "Confirm file visibility is not blocked by ownership or ACL changes." },
      { id: "files-hidden", title: "Reveal hidden/system items", details: "Enable hidden items and inspect attribute flags (`attrib`) when needed." },
      { id: "files-restore", title: "Restore from backups/snapshots", details: "Recover from File History, VSS shadow copy, or enterprise backup platform." },
      { id: "files-audit", title: "Review change/audit logs", details: "Identify delete/move actor and timestamp to prevent repeat data loss." }
    ],
    proTips: [
      "Start with metadata search (`*.xlsx`, date range) when filename is uncertain.",
      "Preserve original folder structure during restores to reduce user confusion.",
      "Enable recycle/version retention policies where absent."
    ]
  },
  {
    slug: "storage-full-low-disk-space",
    title: "Storage Full / Low Disk Space",
    category: "System Maintenance",
    summary: "Recovers space and prevents repeat low-disk incidents.",
    checklist: [
      { id: "disk-usage-map", title: "Map largest space consumers", details: "Use storage analyzer to identify top folders/files by size quickly." },
      { id: "disk-temp-clean", title: "Clean temporary/system cache data", details: "Run `cleanmgr`/Storage Sense and clear temp/update cache safely." },
      { id: "disk-downloads", title: "Review user-heavy folders", details: "Archive or remove oversized Downloads/Desktop/media content." },
      { id: "disk-uninstall", title: "Remove unused applications", details: "Uninstall obsolete high-footprint software and old app versions." },
      { id: "disk-cloud-files", title: "Offload synced cloud content", details: "Enable Files On-Demand and free local copies where acceptable." },
      { id: "disk-log-prune", title: "Purge stale logs/dumps", details: "Remove old crash dumps/log bundles no longer needed for support." },
      { id: "disk-thresholds", title: "Restore healthy free-space margin", details: "Target sustained free space above threshold (commonly 15-20%)." },
      { id: "disk-monitoring", title: "Set preventative monitoring", details: "Create recurring cleanup cadence and low-space alert thresholds." }
    ],
    proTips: [
      "Large hibernation and page files can consume tens of GB on laptops.",
      "Duplicate media libraries are common after profile migrations.",
      "Create a user-friendly retention policy before bulk deletions."
    ]
  },
  {
    slug: "software-installation-failing",
    title: "Software Installation Failing",
    category: "Software",
    summary: "Fixes install blockers related to permissions, prerequisites, or policy.",
    checklist: [
      { id: "install-error-code", title: "Capture exact installer failure", details: "Record MSI/EXE error code and failure stage from installer logs." },
      { id: "install-admin", title: "Run installer elevated", details: "Use Run as Administrator and confirm local admin rights are present." },
      { id: "install-disk-space", title: "Validate disk and temp capacity", details: "Ensure system and `%TEMP%` have adequate free space." },
      { id: "install-prereqs", title: "Install required prerequisites", details: "Verify required runtimes/frameworks and OS version compatibility." },
      { id: "install-security", title: "Check policy/security blocking", details: "Review AV/AppLocker/Defender controlled folder access logs for blocks." },
      { id: "install-clean-cache", title: "Clear stale installer cache", details: "Clear temp/cache and retry with a fresh download/checksum-verified package." },
      { id: "install-service-state", title: "Validate Windows Installer service", details: "Confirm `msiserver` is running and not disabled (`services.msc`)." },
      { id: "install-alt-method", title: "Use alternate install path", details: "Try vendor offline package or managed deployment tool (Intune/SCCM)." }
    ],
    proTips: [
      "Installer failures after 90% often indicate post-install custom actions.",
      "Always verify checksum when installer downloads appear corrupted.",
      "Disable per-user remnants before reinstalling machine-wide packages."
    ]
  },
  {
    slug: "incorrect-system-time-date",
    title: "Incorrect System Time/Date",
    category: "System Configuration",
    summary: "Corrects clock drift that breaks auth, sync, and certificates.",
    checklist: [
      { id: "time-timezone", title: "Verify timezone and DST", details: "Confirm configured timezone/region and daylight-saving settings are correct." },
      { id: "time-auto-sync", title: "Enable automatic time settings", details: "Turn on automatic date/time and trigger sync from Windows Time settings." },
      { id: "time-w32tm", title: "Check Windows Time service", details: "Run `w32tm /query /status` and validate service health/source." },
      { id: "time-domain", title: "Validate domain time hierarchy", details: "For domain-joined systems, confirm time source is domain controller hierarchy." },
      { id: "time-cmos", title: "Check BIOS/CMOS clock", details: "If time resets after shutdown, inspect BIOS clock and possible CMOS battery issue." },
      { id: "time-permissions", title: "Review policy constraints", details: "Confirm group policy allows expected time sync behavior and source settings." },
      { id: "time-resync", title: "Force NTP resync", details: "Run `w32tm /resync` (admin) after correcting source configuration." },
      { id: "time-validation", title: "Retest dependent services", details: "Validate VPN, SSO, MFA, and certificate-based apps after time correction." }
    ],
    proTips: [
      "Even a few minutes of drift can break MFA and SSO flows.",
      "Persistent drift on standalone systems often points to CMOS battery wear.",
      "Domain-joined clients should not use arbitrary public NTP servers."
    ]
  },
  {
    slug: "printer-offline-wont-print",
    title: "Printer Offline or Won't Print",
    category: "Peripherals",
    summary: "Restores print path from endpoint spooler to printer device.",
    checklist: [
      { id: "print-power-network", title: "Confirm printer online state", details: "Verify printer power/network and test ping or embedded web UI reachability." },
      { id: "print-default", title: "Verify target queue selection", details: "Ensure correct default printer is selected (not XPS/PDF virtual queue)." },
      { id: "print-queue-clear", title: "Clear stuck print jobs", details: "Purge queue and restart spooler (`net stop spooler && net start spooler`)." },
      { id: "print-port", title: "Validate queue port/IP mapping", details: "Confirm printer port points to current printer IP address." },
      { id: "print-driver", title: "Update or reinstall print driver", details: "Install correct OEM model driver; avoid incompatible generic drivers." },
      { id: "print-status", title: "Resolve hardware alerts", details: "Clear jams/toner/paper errors shown on printer control panel." },
      { id: "print-test-page", title: "Run local system test page", details: "Print Windows test page to isolate app issue vs print subsystem." },
      { id: "print-redeploy", title: "Recreate printer object", details: "Remove and re-add queue if spooler/queue configuration appears corrupted." }
    ],
    proTips: [
      "IP changes after DHCP renewal are a top cause of sudden offline status.",
      "Set DHCP reservation for network printers to stabilize mappings.",
      "Use vendor universal drivers only when model-specific drivers fail."
    ]
  },
  {
    slug: "external-monitor-no-signal",
    title: "External Monitor Displays \"No Signal\"",
    category: "Peripherals",
    summary: "Restores external display output across cables, ports, and settings.",
    checklist: [
      { id: "monitor-input", title: "Set correct monitor input", details: "Confirm display is set to active source (HDMI/DP/USB-C) not auto-misdetection." },
      { id: "monitor-cable", title: "Swap cable/adapter", details: "Test known-good cable/dongle and verify firm connector seating." },
      { id: "monitor-port", title: "Test alternate video port path", details: "Try different GPU/dock output port to isolate failed port chain." },
      { id: "monitor-detect", title: "Force OS display detection", details: "Open display settings and click Detect; verify Extend/Duplicate mode." },
      { id: "monitor-shortcut", title: "Cycle projection mode", details: "Use `Win + P` to reinitialize output mode quickly." },
      { id: "monitor-driver", title: "Update graphics/dock drivers", details: "Install latest GPU, dock firmware, and chipset drivers." },
      { id: "monitor-resolution", title: "Set supported mode", details: "Apply monitor-native resolution/refresh to avoid unsupported timing." },
      { id: "monitor-test-device", title: "Cross-test monitor hardware", details: "Connect monitor to another known-good source to confirm panel health." }
    ],
    proTips: [
      "USB-C ports differ: some carry power/data but not DisplayPort Alt Mode.",
      "Dock firmware mismatch can break multi-monitor detection intermittently.",
      "When in doubt, direct-connect before troubleshooting dock chains."
    ]
  },
  {
    slug: "usb-peripheral-not-recognized",
    title: "USB Peripheral Not Recognized",
    category: "Peripherals",
    summary: "Recovers USB device detection across port, power, and driver layers.",
    checklist: [
      { id: "usb-port-test", title: "Try alternate USB port types", details: "Test different ports (rear/front, USB 2.0/3.x) to isolate host port issues." },
      { id: "usb-device-test", title: "Test device on another system", details: "Determine whether fault follows the USB device or host computer." },
      { id: "usb-cable", title: "Replace with known-good data cable", details: "Use certified data-capable cable; many cables only provide charging." },
      { id: "usb-power", title: "Check device power requirements", details: "Use powered USB hub when peripheral current draw exceeds host output." },
      { id: "usb-device-manager", title: "Inspect Device Manager status", details: "Check unknown/error device entries and reinstall affected device driver." },
      { id: "usb-controller", title: "Rebuild USB controller stack", details: "Uninstall USB host controllers in Device Manager and reboot." },
      { id: "usb-selective-suspend", title: "Test power management impact", details: "Temporarily disable USB selective suspend to confirm power-saving issue." },
      { id: "usb-firmware", title: "Update platform firmware/chipset", details: "Apply BIOS/chipset updates that include USB stability fixes." }
    ],
    proTips: [
      "For storage devices, always rule out cable quality first.",
      "Intermittent disconnects can be power-related even when device appears.",
      "Document vendor and hardware IDs to track recurring driver issues."
    ]
  },
  {
    slug: "no-audio-video-calls",
    title: "No Audio During Video Calls",
    category: "Collaboration",
    summary: "Restores microphone/speaker paths for conferencing applications.",
    checklist: [
      { id: "audio-output-select", title: "Verify app output device", details: "Confirm conferencing app output is set to intended speaker/headset." },
      { id: "audio-input-select", title: "Verify app microphone source", details: "Confirm selected microphone and ensure live input meter responds." },
      { id: "audio-system-mute", title: "Check all mute/volume controls", details: "Validate headset mute switch, OS mixer, and in-app mute states." },
      { id: "audio-test-tools", title: "Run built-in test call", details: "Use app test-call feature to validate bidirectional audio path." },
      { id: "audio-exclusive-mode", title: "Disable exclusive audio lock", details: "In sound settings, disable exclusive mode to prevent app device capture conflicts." },
      { id: "audio-driver-update", title: "Update audio and USB/BT drivers", details: "Install OEM audio stack and headset/dock drivers, then reboot." },
      { id: "audio-permissions", title: "Validate microphone permissions", details: "Confirm OS privacy settings allow microphone access for desktop apps." },
      { id: "audio-alt-device", title: "Cross-test known-good headset", details: "Swap device to isolate endpoint hardware from software configuration." }
    ],
    proTips: [
      "Bluetooth profile switching can force low-quality telephony audio modes.",
      "If only one app fails, reset that app's media device settings first.",
      "Keep a wired headset for fast fallback during critical meetings."
    ]
  },
  {
    slug: "webcam-not-functioning",
    title: "Webcam Not Functioning",
    category: "Collaboration",
    summary: "Fixes camera detection and permission issues affecting calls and apps.",
    checklist: [
      { id: "cam-privacy-shutter", title: "Check physical privacy controls", details: "Confirm shutter switch/hotkey is not disabling the camera hardware." },
      { id: "cam-app-select", title: "Select correct camera in app", details: "Verify conferencing app uses intended integrated/external camera source." },
      { id: "cam-permissions", title: "Review camera privacy permissions", details: "Allow camera usage for desktop apps in system privacy settings." },
      { id: "cam-device-manager", title: "Inspect Device Manager health", details: "Check for disabled camera, unknown device, or driver error states." },
      { id: "cam-driver", title: "Reinstall/update camera drivers", details: "Install OEM/UVC driver package and reboot to reload camera stack." },
      { id: "cam-conflict", title: "Close apps holding camera handle", details: "Exit other apps (Teams/Zoom/browser tabs) that may lock camera stream." },
      { id: "cam-usb-test", title: "Test alternate USB/cable path", details: "For external camera, try different port and known-good cable." },
      { id: "cam-firmware", title: "Update firmware and client app", details: "Apply camera firmware and conferencing client updates for compatibility fixes." }
    ],
    proTips: [
      "Teams/Zoom can silently retain old camera selections after docking changes.",
      "A black feed with active camera light often indicates app conflict.",
      "On laptops, function-key camera toggles are frequently overlooked."
    ]
  },
  {
    slug: "forgotten-password-account-lockout",
    title: "Forgotten Password / Account Lockout",
    category: "Identity & Access",
    summary: "Restores secure account access while maintaining policy compliance.",
    checklist: [
      { id: "lockout-verify-identity", title: "Perform identity verification", details: "Complete approved identity checks before any reset/unlock activity." },
      { id: "lockout-confirm-status", title: "Confirm exact account state", details: "Determine if account is locked, disabled, expired, or password-expired." },
      { id: "lockout-reset", title: "Execute secure password reset", details: "Reset password via approved workflow and issue compliant temporary credentials." },
      { id: "lockout-unlock", title: "Clear lockout condition", details: "Unlock account in identity directory only after verification is complete." },
      { id: "lockout-sync", title: "Update cached credentials", details: "Re-authenticate on affected endpoints and clear stale saved credentials." },
      { id: "lockout-mfa", title: "Validate MFA after reset", details: "Confirm enrolled MFA methods still work and re-register if required." },
      { id: "lockout-policy", title: "Find recurring bad-attempt source", details: "Check mobile apps, mapped drives, and scheduled tasks using old credentials." },
      { id: "lockout-document", title: "Document root cause and fix", details: "Log lockout cause, actions taken, and prevention guidance for user." }
    ],
    proTips: [
      "Most repeat lockouts come from stale credentials on another device.",
      "After reset, clear Windows Credential Manager entries when needed.",
      "Encourage password manager use to reduce failed attempts."
    ]
  },
  {
    slug: "suspected-malware-adware",
    title: "Suspected Malware / Adware",
    category: "Security",
    summary: "Contains possible infection and performs safe remediation steps.",
    checklist: [
      { id: "malware-isolate", title: "Isolate affected endpoint", details: "Disconnect network access immediately when active compromise is suspected." },
      { id: "malware-symptom-log", title: "Capture indicators of compromise", details: "Document pop-ups, redirects, unknown processes, and timeline of behavior." },
      { id: "malware-safe-scan", title: "Run trusted AV/EDR full scan", details: "Update signatures and perform full scan with quarantine/remediation enabled." },
      { id: "malware-browser-clean", title: "Clean browser hijack artifacts", details: "Remove malicious extensions and reset homepage/search/provider settings." },
      { id: "malware-startup-audit", title: "Audit persistence mechanisms", details: "Inspect startup entries, scheduled tasks, services, and run keys." },
      { id: "malware-patch", title: "Patch vulnerable software", details: "Apply OS/browser/app security updates after active threat removal." },
      { id: "malware-password-reset", title: "Reset potentially exposed credentials", details: "Force password changes for accounts used on compromised endpoint." },
      { id: "malware-escalate", title: "Escalate high-severity findings", details: "Notify security team for ransomware/exfiltration indicators and follow IR process." }
    ],
    proTips: [
      "Collect forensic artifacts before wiping when policy requires evidence.",
      "Browser sync can reintroduce malicious extensions after cleanup.",
      "If in doubt, reimage and restore from known-clean backups."
    ]
  },
  {
    slug: "mfa-failing",
    title: "MFA (Multi-Factor Authentication) Failing",
    category: "Identity & Access",
    summary: "Resolves second-factor failures across authenticator, SMS, and policy.",
    checklist: [
      { id: "mfa-time-check", title: "Verify device time alignment", details: "Confirm phone and workstation clocks are accurate; OTPs fail with drift." },
      { id: "mfa-method-check", title: "Confirm expected MFA method", details: "Ensure user is approving the correct method/device (push, TOTP, SMS, token)." },
      { id: "mfa-network-check", title: "Check delivery path availability", details: "Validate mobile signal/data and notification delivery for push/SMS methods." },
      { id: "mfa-app-refresh", title: "Re-register authenticator app", details: "Remove/re-add account in authenticator when token seed appears out of sync." },
      { id: "mfa-policy-review", title: "Review conditional access policy", details: "Confirm location/device-compliance policy is not blocking successful challenge." },
      { id: "mfa-lockout-status", title: "Check account risk and lock state", details: "Verify account is not blocked by risk policy, fraud lock, or lockout." },
      { id: "mfa-backup-method", title: "Use alternate verification method", details: "Attempt backup codes, alternate phone, or hardware token path." },
      { id: "mfa-admin-reset", title: "Perform admin MFA reset if needed", details: "Reset MFA registration only after strong identity verification is complete." }
    ],
    proTips: [
      "Push fatigue protections can reject repeated prompts by design.",
      "Keep at least two MFA methods enrolled for resilience.",
      "Travel or VPN egress changes often trigger stricter MFA challenges."
    ]
  },
  {
    slug: "corrupted-windows-user-profile",
    title: "Corrupted Windows User Profile",
    category: "OS User Profile",
    summary: "Recovers user environment from profile corruption and temp profile logins.",
    checklist: [
      { id: "profile-confirm", title: "Confirm profile corruption symptoms", details: "Validate temp profile behavior, missing desktop data, or profile load errors." },
      { id: "profile-backup", title: "Back up affected profile data", details: "Copy user Desktop/Documents and required AppData items before modifications." },
      { id: "profile-new-user", title: "Create and test clean profile", details: "Sign in with new profile to confirm issue is profile-specific." },
      { id: "profile-registry", title: "Inspect ProfileList SID entries", details: "Check `ProfileList` for `.bak` SID conflicts and broken profile path values." },
      { id: "profile-permissions", title: "Repair profile folder ACLs", details: "Confirm SYSTEM/user permissions are intact on profile root and key subfolders." },
      { id: "profile-migrate", title: "Migrate required user data", details: "Move user files/settings to clean profile without copying full corrupted AppData." },
      { id: "profile-app-test", title: "Validate business app sign-ins", details: "Test core applications and account access in the rebuilt profile." },
      { id: "profile-cleanup", title: "Archive and retire bad profile", details: "After validation, archive/remove corrupted profile remnants safely." }
    ],
    proTips: [
      "Do not copy entire old AppData blindly; migrate only needed items.",
      "A clean profile with same apps working confirms profile-level issue.",
      "Profile corruption often follows abrupt shutdown or storage faults."
    ]
  },
  {
    slug: "email-not-syncing-outlook",
    title: "Email Not Syncing (Outlook)",
    category: "Collaboration",
    summary: "Fixes send/receive and mailbox update failures in Outlook clients.",
    checklist: [
      { id: "mail-network", title: "Validate connectivity and service health", details: "Confirm internet access and Exchange/M365 service status before local repair." },
      { id: "mail-work-offline", title: "Disable Work Offline state", details: "Ensure Outlook is online and `Send/Receive` completes without immediate errors." },
      { id: "mail-credentials", title: "Revalidate mailbox authentication", details: "Re-enter account credentials and clear repeated stale auth prompts." },
      { id: "mail-profile", title: "Test new Outlook profile", details: "Create clean mail profile in Control Panel Mail to isolate profile corruption." },
      { id: "mail-cache", title: "Rebuild OST cache safely", details: "Close Outlook, rename/remove OST, and let it rebuild from server." },
      { id: "mail-addins", title: "Disable add-ins in safe mode", details: "Launch with `outlook.exe /safe` and disable problematic COM add-ins." },
      { id: "mail-autodiscover", title: "Validate autodiscover/server config", details: "Test autodiscover results and account endpoint settings for mailbox." },
      { id: "mail-update-repair", title: "Update and repair Office", details: "Apply Office updates and run Quick/Online Repair if sync failures persist." }
    ],
    proTips: [
      "Sync stalls with huge OST files may improve after mailbox cleanup.",
      "Outlook safe mode is the fastest way to test add-in interference.",
      "Always confirm issue reproduces in webmail before deep client repair."
    ]
  },
  {
    slug: "rdp-remote-desktop-fails-to-connect",
    title: "RDP (Remote Desktop) Fails to Connect",
    category: "Remote Access",
    summary: "Restores Remote Desktop connectivity by isolating service, policy, and network issues.",
    checklist: [
      { id: "rdp-host-reachability", title: "Verify target host is reachable", details: "Run `ping <hostname>` and `ping <ip>` and confirm the remote device is powered on." },
      { id: "rdp-port-test", title: "Confirm RDP port path", details: "Run `Test-NetConnection <host> -Port 3389` in PowerShell to validate TCP 3389 reachability." },
      { id: "rdp-service-state", title: "Check Remote Desktop service", details: "On the host, verify `TermService` is running and set to start automatically (`services.msc`)." },
      { id: "rdp-enabled-setting", title: "Ensure RDP is enabled on host", details: "Confirm remote access is enabled in System settings and host is not configured to block RDP." },
      { id: "rdp-user-rights", title: "Validate user permissions", details: "Confirm the user is in Remote Desktop Users/local admins and not denied via policy." },
      { id: "rdp-firewall-rule", title: "Review firewall and security rules", details: "Verify Windows Firewall and upstream firewall/NAT allow inbound RDP to the host." },
      { id: "rdp-nla-auth", title: "Troubleshoot NLA and credential errors", details: "Confirm account is not locked and test with proper domain format (`DOMAIN\\user` or UPN)." },
      { id: "rdp-event-logs", title: "Collect host-side event evidence", details: "Review Event Viewer logs under TerminalServices and Security for login rejection details." }
    ],
    proTips: [
      "Testing by IP and hostname quickly separates DNS from service issues.",
      "A hotspot test helps rule out local corporate network filtering.",
      "Document exact RDP error text before retries overwrite context."
    ]
  },
  {
    slug: "onedrive-sharepoint-sync-stuck",
    title: "OneDrive/SharePoint Sync Stuck",
    category: "Collaboration",
    summary: "Fixes stalled cloud file sync caused by auth, client state, or file conflicts.",
    checklist: [
      { id: "sync-service-health", title: "Check Microsoft 365 service health", details: "Confirm there is no active OneDrive/SharePoint service incident before local changes." },
      { id: "sync-signin-state", title: "Validate OneDrive sign-in", details: "Open OneDrive settings and confirm the expected tenant/account is signed in." },
      { id: "sync-client-restart", title: "Restart OneDrive client cleanly", details: "Exit OneDrive fully from tray and relaunch `OneDrive.exe` to refresh sync engine state." },
      { id: "sync-reset-client", title: "Run OneDrive reset", details: "Execute `%localappdata%\\Microsoft\\OneDrive\\OneDrive.exe /reset`, then start OneDrive again." },
      { id: "sync-conflict-files", title: "Resolve blocked file names/types", details: "Check for invalid characters, path length issues, and conflicted files in sync reports." },
      { id: "sync-storage-quota", title: "Confirm quota and disk space", details: "Verify cloud storage quota and local free disk space are sufficient for pending changes." },
      { id: "sync-library-link", title: "Re-link affected SharePoint library", details: "Stop sync for problematic library and reconnect from SharePoint `Sync` action." },
      { id: "sync-logs", title: "Collect OneDrive diagnostics", details: "Gather client diagnostics logs from OneDrive settings and capture exact error code/timestamp." }
    ],
    proTips: [
      "Path length and invalid characters are common silent blockers.",
      "Large file batches may appear frozen until hash/index processing completes.",
      "Keep OneDrive client updated to reduce tenant compatibility issues."
    ]
  },
  {
    slug: "emails-bouncing-or-delayed-mail-flow",
    title: "Emails Bouncing or Delayed (Mail Flow)",
    category: "Email",
    summary: "Diagnoses delivery failures and latency across DNS, connectors, and spam controls.",
    checklist: [
      { id: "mailflow-non-delivery-report", title: "Capture NDR or delay details", details: "Collect full bounce message, SMTP code, sender/recipient, and timestamp." },
      { id: "mailflow-message-trace", title: "Run message trace", details: "Use Exchange message trace to identify where the message is delayed or rejected." },
      { id: "mailflow-domain-dns", title: "Validate MX/SPF/DKIM/DMARC records", details: "Run `nslookup -type=mx <domain>` and verify sender authentication records are correct." },
      { id: "mailflow-connector-check", title: "Review mail connectors and routing", details: "Confirm send/receive connector settings, smart host routes, and TLS requirements." },
      { id: "mailflow-queue-health", title: "Inspect transport queues", details: "Check for backlog or retry spikes in transport queues indicating relay bottlenecks." },
      { id: "mailflow-reputation-block", title: "Check sender reputation and blocklists", details: "Verify outbound IP/domain reputation and whether recipient filters are blocking traffic." },
      { id: "mailflow-size-policy", title: "Review message size and policy blocks", details: "Confirm attachment size, DLP, and transport rules are not causing rejection/quarantine." },
      { id: "mailflow-test-message", title: "Retest with controlled sample", details: "Send a small plain-text test to internal and external recipients and compare delivery path." }
    ],
    proTips: [
      "NDR SMTP code is the fastest clue to true failure domain.",
      "Internal delivery success with external failures often points to DNS or reputation.",
      "Record exact UTC timestamps for reliable trace correlation."
    ]
  },
  {
    slug: "virtual-machine-paused-or-wont-boot",
    title: "Virtual Machine (VM) Paused or Won't Boot",
    category: "Virtualization",
    summary: "Restores VM startup by validating host resources, storage, and hypervisor state.",
    checklist: [
      { id: "vm-host-health", title: "Check host health and resources", details: "Verify host CPU/RAM/storage are not exhausted and hypervisor services are healthy." },
      { id: "vm-datastore-space", title: "Validate datastore capacity", details: "Confirm VM datastore has free space for snapshots, swap, and active writes." },
      { id: "vm-snapshot-state", title: "Review snapshot/ checkpoint condition", details: "Check for stuck or excessive snapshots that prevent normal boot progression." },
      { id: "vm-lock-file", title: "Inspect VM lock or file access issues", details: "Ensure VM disk/config files are not locked by another host/process." },
      { id: "vm-power-cycle", title: "Perform controlled power cycle", details: "Force stop only if needed, then power on cleanly from hypervisor console." },
      { id: "vm-console-errors", title: "Capture boot/console errors", details: "Review VM console output for bootloader, disk, or kernel panic indicators." },
      { id: "vm-network-storage-path", title: "Check storage and network paths", details: "Confirm host connectivity to shared storage/network backing the VM files." },
      { id: "vm-logs", title: "Review hypervisor event logs", details: "Collect host and VM events around failure time for escalation or vendor support." }
    ],
    proTips: [
      "Low datastore free space frequently causes paused VM behavior.",
      "Consolidate stale snapshots before they become operational risk.",
      "Capture console screenshots before reboot attempts erase clues."
    ]
  },
  {
    slug: "backup-job-fails-local-or-cloud",
    title: "Backup Job Fails (Local or Cloud)",
    category: "Backup & Recovery",
    summary: "Restores backup success by validating job scope, targets, and credentials.",
    checklist: [
      { id: "backup-error-details", title: "Capture backup error output", details: "Record exact job error code, failed object, and timestamp from backup logs." },
      { id: "backup-target-reachability", title: "Verify backup target availability", details: "Confirm local/NAS/cloud target is reachable and not in outage state." },
      { id: "backup-space", title: "Check destination capacity", details: "Validate adequate free space and retention settings on backup destination." },
      { id: "backup-auth", title: "Validate backup credentials", details: "Confirm service account keys/tokens/passwords are valid and not expired." },
      { id: "backup-schedule-overlap", title: "Review schedule and job contention", details: "Check if overlapping jobs or maintenance windows are causing lock/contention failures." },
      { id: "backup-vss-snapshot", title: "Inspect snapshot/VSS health", details: "For Windows workloads, run `vssadmin list writers` and verify no failed writers." },
      { id: "backup-network-bandwidth", title: "Assess network throughput for cloud jobs", details: "Test path latency/packet loss and verify bandwidth is sufficient for job window." },
      { id: "backup-retry-and-verify", title: "Rerun and validate recovery point", details: "Run a controlled retry and confirm a usable restore point was created." }
    ],
    proTips: [
      "A successful job is not enough; verify restore integrity regularly.",
      "Credential expiration is a top cause of sudden cloud backup failures.",
      "Track backup duration trends to catch issues before outright failure."
    ]
  },
  {
    slug: "laptop-battery-not-charging-plugged-in",
    title: "Laptop Battery Not Charging (Plugged In)",
    category: "Hardware",
    summary: "Diagnoses charging failures across adapter, battery health, and firmware controls.",
    checklist: [
      { id: "battery-adapter-check", title: "Validate AC adapter and cable", details: "Confirm OEM-rated charger wattage and test with known-good adapter/cable." },
      { id: "battery-port-inspection", title: "Inspect charge port and connector fit", details: "Check USB-C/DC-in port for debris, damage, or loose connection." },
      { id: "battery-power-cycle", title: "Perform EC power reset", details: "Shut down, disconnect power, hold power button 20-30 seconds, then retest charging." },
      { id: "battery-drivers", title: "Refresh battery drivers", details: "In Device Manager, uninstall Microsoft AC Adapter/Battery devices and reboot." },
      { id: "battery-bios-health", title: "Check BIOS battery diagnostics", details: "Run OEM BIOS diagnostics to evaluate battery wear and charging capability." },
      { id: "battery-threshold-mode", title: "Review charging threshold settings", details: "Disable battery conservation/charge limit mode in OEM utility if inappropriate." },
      { id: "battery-firmware-update", title: "Update BIOS/EC and power firmware", details: "Apply vendor firmware updates that include charging fixes." },
      { id: "battery-cross-test", title: "Cross-test battery or adapter", details: "Use known-good battery/charger where possible to isolate failed component." }
    ],
    proTips: [
      "Underpowered USB-C chargers can run the laptop but not charge battery.",
      "OEM conservation modes often cap charging around 60-80 percent by design.",
      "Swollen batteries require immediate hardware escalation and safe handling."
    ]
  },
  {
    slug: "usb-c-docking-station-malfunctioning",
    title: "USB-C Docking Station Malfunctioning",
    category: "Peripherals",
    summary: "Restores dock stability for displays, network, power, and USB devices.",
    checklist: [
      { id: "dock-power-check", title: "Verify dock power brick status", details: "Confirm dock power adapter is connected, correct wattage, and LED indicators are normal." },
      { id: "dock-cable-quality", title: "Test certified USB-C cable", details: "Use known-good full-featured USB-C cable supporting power, data, and display." },
      { id: "dock-port-compatibility", title: "Validate host port capabilities", details: "Confirm laptop USB-C/Thunderbolt port supports required dock mode and display output." },
      { id: "dock-firmware-update", title: "Update dock firmware", details: "Apply vendor dock firmware updates and reboot both dock and laptop." },
      { id: "dock-driver-stack", title: "Update host drivers", details: "Install latest chipset, graphics, USB controller, and Thunderbolt drivers." },
      { id: "dock-cold-reset", title: "Perform dock cold reset", details: "Disconnect dock from host and power for 30 seconds, then reconnect in sequence." },
      { id: "dock-direct-test", title: "Bypass dock for component isolation", details: "Test monitor/network/USB devices directly on laptop to isolate dock path failures." },
      { id: "dock-single-peripheral-test", title: "Reattach peripherals incrementally", details: "Reconnect one device at a time to identify a specific failing peripheral or port." }
    ],
    proTips: [
      "Many USB-C cables are charge-only and cause partial dock failures.",
      "Dock firmware and graphics driver mismatches commonly break multi-display setups.",
      "Document exact dock model and firmware level for repeat incidents."
    ]
  },
  {
    slug: "bitlocker-recovery-screen-on-boot",
    title: "BitLocker Recovery Screen on Boot",
    category: "Security",
    summary: "Safely restores access when BitLocker enters recovery due to trust state changes.",
    checklist: [
      { id: "bitlocker-key-verify", title: "Verify user identity and retrieve key", details: "Complete identity checks and obtain recovery key from approved directory/portal." },
      { id: "bitlocker-enter-key", title: "Unlock device with recovery key", details: "Enter the 48-digit key and confirm successful boot to Windows." },
      { id: "bitlocker-cause-review", title: "Identify trigger event", details: "Check for recent BIOS/TPM/boot configuration changes or hardware moves." },
      { id: "bitlocker-protection-status", title: "Check BitLocker status", details: "Run `manage-bde -status` to confirm protection state and encrypted volumes." },
      { id: "bitlocker-tpm-health", title: "Validate TPM health", details: "Run `tpm.msc` and verify TPM is ready without faults." },
      { id: "bitlocker-suspend-resume", title: "Cycle protector safely", details: "Run `manage-bde -protectors -disable C:` then re-enable after remediation/reboot." },
      { id: "bitlocker-update-sequence", title: "Use safe firmware update sequence", details: "Suspend BitLocker before BIOS/firmware updates and resume after successful boot." },
      { id: "bitlocker-key-rotation", title: "Rotate and escrow keys if required", details: "Rotate recovery key per policy and confirm escrow in directory is current." }
    ],
    proTips: [
      "Unexpected recovery prompts often follow firmware or boot-order changes.",
      "Never clear TPM blindly without confirming key escrow and recovery plan.",
      "Keep recovery key retrieval process documented for help desk speed."
    ]
  },
  {
    slug: "phantom-keystrokes-ghost-touching",
    title: "Phantom Keystrokes / Ghost Touching",
    category: "Input Devices",
    summary: "Eliminates unintended keyboard or touch input from hardware, driver, or software causes.",
    checklist: [
      { id: "ghost-input-isolate-peripheral", title: "Isolate built-in vs external input", details: "Disconnect external keyboards/mice/tablets and retest to identify source device." },
      { id: "ghost-input-clean-hardware", title: "Inspect and clean input surfaces", details: "Check keyboard keys/touchscreen for debris, moisture, pressure, or physical damage." },
      { id: "ghost-input-safe-mode-test", title: "Test behavior in Safe Mode", details: "Boot Safe Mode to determine whether third-party software is injecting input." },
      { id: "ghost-input-driver-refresh", title: "Reinstall input drivers", details: "Refresh keyboard/touch/HID drivers in Device Manager and reboot." },
      { id: "ghost-input-touch-disable", title: "Temporarily disable touch input", details: "Disable HID-compliant touch screen to confirm whether ghost touches stop." },
      { id: "ghost-input-accessibility-check", title: "Review accessibility/input settings", details: "Verify Sticky Keys, Filter Keys, and input language switching are not misfiring." },
      { id: "ghost-input-malware-scan", title: "Rule out malicious automation", details: "Run trusted endpoint scan to detect script/remote-control abuse causing fake input." },
      { id: "ghost-input-firmware-update", title: "Update BIOS and input firmware", details: "Apply OEM BIOS/EC/touch firmware updates with known input stability fixes." }
    ],
    proTips: [
      "External USB receivers can create random input when interference is high.",
      "Touchscreen ghost taps often worsen while charging with non-OEM adapters.",
      "Video recording the issue helps correlate patterns for vendor support."
    ]
  },
  {
    slug: "system-freezes-entirely-no-bsod-hard-lock",
    title: "System Freezes Entirely (No BSOD, Hard Lock)",
    category: "OS Stability",
    summary: "Investigates complete system hangs by testing thermals, drivers, memory, and storage.",
    checklist: [
      { id: "hardlock-pattern", title: "Capture freeze pattern and triggers", details: "Document workload, timing, and whether audio/mouse responsiveness fully stops." },
      { id: "hardlock-thermal-check", title: "Check temperature and throttling", details: "Monitor CPU/GPU temps under load to detect thermal-induced lockups." },
      { id: "hardlock-event-viewer", title: "Review Event Viewer around hang", details: "Inspect System/Application logs for warnings before forced power-off events." },
      { id: "hardlock-driver-updates", title: "Update critical drivers", details: "Update chipset, storage controller, and graphics drivers from OEM sources." },
      { id: "hardlock-memory-test", title: "Run memory diagnostics", details: "Execute `mdsched.exe` or vendor tools to identify intermittent RAM faults." },
      { id: "hardlock-storage-health", title: "Check storage integrity", details: "Run SMART checks and `chkdsk /scan` to detect disk/controller instability." },
      { id: "hardlock-clean-boot", title: "Perform clean boot isolation", details: "Disable non-Microsoft services/startup apps and retest stability." },
      { id: "hardlock-firmware-bios", title: "Apply firmware and BIOS updates", details: "Install stable BIOS/firmware revisions addressing freeze/hang issues." }
    ],
    proTips: [
      "Hard locks with no logs often point to firmware, memory, or power issues.",
      "Change one variable at a time to avoid masking root cause.",
      "If freezes started recently, prioritize rolling back recent driver changes."
    ]
  },
  {
    slug: "windows-update-stuck-or-failing",
    title: "Windows Update Stuck or Failing",
    category: "System Maintenance",
    summary: "Restores Windows Update function by repairing components and policy blockers.",
    checklist: [
      { id: "wu-error-code", title: "Capture update KB and error code", details: "Record failing update ID/KB and exact Windows Update error code." },
      { id: "wu-disk-time", title: "Validate disk space and system time", details: "Ensure adequate free space and correct date/time before retrying updates." },
      { id: "wu-troubleshooter", title: "Run Windows Update troubleshooter", details: "Execute built-in troubleshooter to auto-repair common update component issues." },
      { id: "wu-services", title: "Verify update services state", details: "Confirm `wuauserv`, `BITS`, and Cryptographic Services are running." },
      { id: "wu-reset-components", title: "Reset update cache components", details: "Stop services, clear `SoftwareDistribution`/`catroot2`, restart services, and retry." },
      { id: "wu-sfc-dism", title: "Repair system image and files", details: "Run `DISM /Online /Cleanup-Image /RestoreHealth` then `sfc /scannow`." },
      { id: "wu-manual-kb", title: "Install update manually", details: "Download failing KB from Microsoft Update Catalog and install offline." },
      { id: "wu-policy-review", title: "Check WSUS/GPO constraints", details: "Review domain update policy, deferrals, and WSUS connectivity for enterprise devices." }
    ],
    proTips: [
      "A stuck progress percentage does not always mean frozen; check disk/network activity.",
      "Corrupt component store often causes repeated cumulative update failures.",
      "Collect `WindowsUpdate.log` when escalating persistent enterprise failures."
    ]
  },
  {
    slug: "software-license-activation-error-office-windows",
    title: "Software License/Activation Error (Office/Windows)",
    category: "Licensing",
    summary: "Resolves activation failures caused by entitlement mismatch, network, or token corruption.",
    checklist: [
      { id: "activation-error-capture", title: "Capture activation code and product type", details: "Record exact activation error and confirm Office/Windows edition and channel." },
      { id: "activation-account-check", title: "Validate licensed account/entitlement", details: "Confirm user is signed in with account that owns a valid license." },
      { id: "activation-time-network", title: "Verify time and connectivity", details: "Correct system clock and confirm internet access to activation endpoints." },
      { id: "activation-signout-signin", title: "Refresh app sign-in token", details: "Sign out/in of Office or Settings > Activation to refresh licensing tokens." },
      { id: "activation-office-status", title: "Check Office licensing status", details: "Run `cscript ospp.vbs /dstatus` (Office) to inspect activation channel and grace state." },
      { id: "activation-windows-status", title: "Check Windows activation status", details: "Run `slmgr /dlv` and `slmgr /xpr` to verify current activation condition." },
      { id: "activation-repair-rearm", title: "Repair activation components", details: "Run Office repair or Windows activation troubleshooter; rearm only when policy allows." },
      { id: "activation-edition-match", title: "Confirm edition/key compatibility", details: "Ensure installed edition matches assigned key/subscription and reassign if needed." }
    ],
    proTips: [
      "Mixed Office channels can cause stubborn activation loops after migration.",
      "Licensing errors after hardware change may require reactivation entitlement check.",
      "Document tenant and SKU details before escalation."
    ]
  },
  {
    slug: "default-file-associations-keep-resetting",
    title: "Default File Associations Keep Resetting",
    category: "System Configuration",
    summary: "Stabilizes file type defaults by resolving policy and application hijack behavior.",
    checklist: [
      { id: "assoc-repro-scope", title: "Confirm affected extensions and scope", details: "Document which file types reset and whether issue impacts one user or all users." },
      { id: "assoc-set-defaults", title: "Set defaults through supported UI", details: "Configure defaults in Windows Settings > Default apps for affected file types." },
      { id: "assoc-app-updates", title: "Check recently installed/updated apps", details: "Identify software that may re-register itself as default after launch/update." },
      { id: "assoc-policy-review", title: "Review GPO/MDM default app policy", details: "Confirm no policy is reapplying an older default-association XML." },
      { id: "assoc-user-profile-test", title: "Test in clean user profile", details: "Validate whether resets follow user profile corruption or machine-wide policy." },
      { id: "assoc-command-verify", title: "Inspect current association mapping", details: "Run `assoc` and `ftype` for impacted extensions to verify actual handlers." },
      { id: "assoc-app-repair", title: "Repair/reinstall competing app", details: "Repair app that fails to hold registration or remove conflicting handler app." },
      { id: "assoc-enforcement", title: "Apply and validate stable baseline", details: "Reapply intended defaults, sign out/in, reboot, and confirm persistence." }
    ],
    proTips: [
      "Browser/PDF app updates commonly override user defaults silently.",
      "Machine-level policy will always win over manual user selections.",
      "Track exactly when reset occurs: logon, reboot, or app launch."
    ]
  },
  {
    slug: "high-ram-usage-system-crawling",
    title: "High RAM Usage (System Crawling)",
    category: "Performance",
    summary: "Improves responsiveness by finding memory pressure sources and leaks.",
    checklist: [
      { id: "ram-baseline", title: "Capture memory utilization baseline", details: "Use Task Manager/Resource Monitor to record total used, commit, and top processes." },
      { id: "ram-process-isolation", title: "Identify runaway process", details: "Sort by memory usage and verify whether usage grows abnormally over time." },
      { id: "ram-startup-reduction", title: "Reduce startup and background load", details: "Disable nonessential startup apps/services and retest system responsiveness." },
      { id: "ram-browser-tabs", title: "Audit browser/session footprint", details: "Close heavy tab groups/extensions and test for immediate memory recovery." },
      { id: "ram-paging-health", title: "Verify paging file configuration", details: "Ensure pagefile is enabled/system-managed and disk has free space." },
      { id: "ram-malware-check", title: "Scan for malware/cryptominer activity", details: "Run endpoint scan to detect malicious processes consuming memory." },
      { id: "ram-driver-update", title: "Update memory-impacting drivers/apps", details: "Patch browser, security agent, and drivers known for memory leak fixes." },
      { id: "ram-capacity-plan", title: "Assess physical RAM adequacy", details: "Compare workload demand to installed RAM and recommend upgrade if consistently saturated." }
    ],
    proTips: [
      "High commit with moderate process memory can indicate driver/kernel leak.",
      "Long uptime often amplifies memory leaks in unstable apps or agents.",
      "Capture snapshots before reboot, because reboot can hide leak evidence."
    ]
  },
  {
    slug: "file-locked-by-another-user-process",
    title: "File Locked by Another User/Process",
    category: "File Access",
    summary: "Releases file locks and restores safe edit access in local or shared storage.",
    checklist: [
      { id: "lock-error-capture", title: "Capture lock message and file path", details: "Record exact application message, full path, and affected file share/library." },
      { id: "lock-owner-identify", title: "Identify lock owner process/user", details: "Use `Computer Management` open files or app admin console to identify lock holder." },
      { id: "lock-handle-tools", title: "Check local file handles", details: "Use Resource Monitor (CPU > Associated Handles) to find process holding the file." },
      { id: "lock-close-apps", title: "Close locking application cleanly", details: "Ask user to save/close app session or terminate stale process if safe." },
      { id: "lock-sync-client", title: "Check sync/coauthoring conflict", details: "For OneDrive/SharePoint files, resolve sync conflict and confirm latest file version." },
      { id: "lock-permissions", title: "Validate share and ACL permissions", details: "Confirm user has modify rights and is not blocked by read-only policy." },
      { id: "lock-temp-files", title: "Remove stale lock temp files", details: "After ensuring no active editor, clear stale `~$` temp lock artifacts if present." },
      { id: "lock-reopen-verify", title: "Retest file access", details: "Reopen file from source path and verify lock no longer appears for target users." }
    ],
    proTips: [
      "Stale lock files are common after abrupt application crashes.",
      "Coauthoring-enabled libraries reduce classic file lock conflicts.",
      "Avoid force-killing process before checking for unsaved work."
    ]
  },
  {
    slug: "suspected-ransomware-activity",
    title: "Suspected Ransomware Activity",
    category: "Security Incident",
    summary: "Contains active ransomware risk and initiates incident response safely.",
    checklist: [
      { id: "ransom-isolate-host", title: "Immediately isolate affected systems", details: "Disconnect wired/wireless network and disable VPN to stop lateral spread." },
      { id: "ransom-preserve-evidence", title: "Preserve forensic evidence", details: "Do not reboot or wipe yet; capture ransom note, file extensions, and timestamps." },
      { id: "ransom-alert-security", title: "Escalate to security incident team", details: "Trigger formal incident response process and notify leadership per playbook." },
      { id: "ransom-disable-accounts", title: "Contain compromised credentials", details: "Disable suspected accounts/sessions and rotate privileged credentials immediately." },
      { id: "ransom-scope-systems", title: "Scope impacted assets", details: "Identify encrypted shares, endpoints, and servers; verify spread boundaries." },
      { id: "ransom-edr-hunt", title: "Run EDR threat hunt and containment", details: "Use EDR indicators to locate related activity and isolate additional hosts." },
      { id: "ransom-backup-validation", title: "Validate clean backup availability", details: "Confirm offline/immutable backups exist before planning restoration." },
      { id: "ransom-recovery-plan", title: "Execute approved recovery workflow", details: "Rebuild from known-clean images/backups and monitor for reinfection signs." }
    ],
    proTips: [
      "Speed of isolation matters more than immediate root-cause certainty.",
      "Never pay or negotiate without executive/legal/security direction.",
      "Offline immutable backups are critical for safe recovery."
    ]
  },
  {
    slug: "user-clicked-a-phishing-link",
    title: "User Clicked a Phishing Link",
    category: "Security Incident",
    summary: "Contains credential compromise risk after phishing interaction and validates account safety.",
    checklist: [
      { id: "phish-intake-details", title: "Capture incident details quickly", details: "Gather message source, link URL, timestamp, and whether credentials were entered." },
      { id: "phish-device-isolate", title: "Isolate endpoint if suspicious behavior", details: "Disconnect host from network if malware download or odd activity is observed." },
      { id: "phish-password-reset", title: "Reset potentially exposed passwords", details: "Force immediate password reset and revoke active sessions/tokens." },
      { id: "phish-mfa-review", title: "Validate MFA and re-register if needed", details: "Confirm MFA remains secure; remove unknown authenticator methods." },
      { id: "phish-mail-search-purge", title: "Hunt and purge phishing email", details: "Search tenant for matching message and remove from other user mailboxes." },
      { id: "phish-url-block", title: "Block malicious URL/domain", details: "Add sender/domain/URL to secure email and web filtering blocklists." },
      { id: "phish-endpoint-scan", title: "Run endpoint malware scan", details: "Perform full AV/EDR scan to ensure no payload executed on the device." },
      { id: "phish-user-education", title: "Document and coach affected user", details: "Record incident actions and provide targeted anti-phishing guidance." }
    ],
    proTips: [
      "Credential reset plus session revocation should happen immediately.",
      "Report phishing samples to improve future filtering controls.",
      "Track whether user only clicked link or also submitted credentials."
    ]
  },
  {
    slug: "blocked-by-corporate-web-filter-firewall",
    title: "Blocked by Corporate Web Filter / Firewall",
    category: "Network Security",
    summary: "Restores approved web access by validating policy scope and false-positive blocks.",
    checklist: [
      { id: "filter-block-page", title: "Capture block page details", details: "Record blocked URL, category, policy/rule ID, username, and timestamp." },
      { id: "filter-scope-check", title: "Validate impact scope", details: "Test from another user/device/network segment to determine if block is global or user-specific." },
      { id: "filter-business-justification", title: "Confirm business need and risk", details: "Verify requested site is business-justified and allowed by company policy." },
      { id: "filter-dns-name-test", title: "Check DNS/path resolution", details: "Run `nslookup <domain>` and `tracert <domain>` to ensure issue is policy, not routing/DNS." },
      { id: "filter-category-review", title: "Review URL categorization", details: "Check if site is miscategorized and eligible for recategorization request." },
      { id: "filter-ssl-inspection", title: "Inspect SSL inspection/certificate issues", details: "Confirm trusted inspection certs are present and not causing false block behavior." },
      { id: "filter-temporary-allow", title: "Apply controlled allow rule if approved", details: "Create least-privilege exception (user/group/time-bound) per security process." },
      { id: "filter-verify-access", title: "Retest and document policy change", details: "Confirm access works as intended and log final rule/action for audit trail." }
    ],
    proTips: [
      "Always capture policy ID to speed firewall/web team triage.",
      "Time-bound exceptions reduce long-term security drift.",
      "If only VPN users fail, verify policy branch tied to VPN subnet."
    ]
  },
  {
    slug: "azure-ad-entra-id-device-sync-failure",
    title: "Azure AD / Entra ID Device Sync Failure",
    category: "Identity & Access",
    summary: "Repairs device registration and sync issues impacting compliance and SSO.",
    checklist: [
      { id: "entra-dsreg-status", title: "Check device registration state", details: "Run `dsregcmd /status` and review AzureAdJoined, DomainJoined, and SSO fields." },
      { id: "entra-time-network", title: "Validate time and connectivity", details: "Ensure accurate system clock and access to Microsoft identity endpoints." },
      { id: "entra-user-signin", title: "Confirm user sign-in health", details: "Verify the user can authenticate to M365 and has required device join permissions." },
      { id: "entra-task-scheduler", title: "Check scheduled sync tasks/services", details: "Verify Workplace Join and related scheduled tasks/services run without errors." },
      { id: "entra-mdm-enrollment", title: "Inspect MDM enrollment status", details: "Confirm Intune/MDM enrollment is not stale, duplicate, or partially removed." },
      { id: "entra-device-rejoin", title: "Perform controlled leave/rejoin", details: "Run `dsregcmd /leave`, reboot, then rejoin device to Entra ID through approved flow." },
      { id: "entra-proxy-tls", title: "Review proxy and TLS interception", details: "Ensure SSL inspection/proxy settings are not breaking device auth endpoints." },
      { id: "entra-portal-validate", title: "Validate device object in admin portal", details: "Confirm device appears healthy/compliant after sync and remove stale duplicate objects." }
    ],
    proTips: [
      "Stale duplicate device objects can silently break compliance evaluation.",
      "Clock drift frequently causes token and registration failures.",
      "Keep proxy bypass list aligned with Microsoft identity endpoint guidance."
    ]
  },
  {
    slug: "certificate-error-on-internal-website",
    title: "Certificate Error on Internal Website",
    category: "Certificates",
    summary: "Fixes trust and TLS chain issues for internal web applications.",
    checklist: [
      { id: "cert-error-capture", title: "Capture exact browser certificate warning", details: "Document error type (name mismatch, expired, untrusted, revoked) and target URL." },
      { id: "cert-name-match", title: "Validate certificate subject/SAN", details: "Ensure website FQDN matches certificate CN/SAN entries exactly." },
      { id: "cert-expiry-check", title: "Check certificate validity dates", details: "Confirm certificate is not expired/not yet valid and system time is correct." },
      { id: "cert-chain-install", title: "Verify intermediate/root chain", details: "Install missing intermediate/root certificates on server and clients as needed." },
      { id: "cert-server-binding", title: "Confirm correct cert binding", details: "Check web server binding to ensure intended certificate is attached to HTTPS endpoint." },
      { id: "cert-revocation-path", title: "Test CRL/OCSP reachability", details: "Verify clients can reach revocation endpoints and are not blocked by firewall/proxy." },
      { id: "cert-proxy-inspection", title: "Inspect TLS interception effects", details: "Confirm security appliance SSL inspection is not replacing cert with untrusted chain." },
      { id: "cert-renew-and-validate", title: "Renew/replace and retest", details: "Deploy corrected certificate and validate from multiple clients/browsers." }
    ],
    proTips: [
      "Name mismatch errors usually indicate wrong cert bound on the server.",
      "Internal PKI issues often appear first on unmanaged or recently rebuilt clients.",
      "Test from browser and `openssl s_client` style tools when available."
    ]
  },
  {
    slug: "wi-fi-keeps-dropping-randomly",
    title: "Wi-Fi Keeps Dropping Randomly",
    category: "Network",
    summary: "Stabilizes intermittent Wi-Fi disconnects by testing signal, drivers, and roaming behavior.",
    checklist: [
      { id: "wifi-drop-pattern", title: "Capture disconnect pattern", details: "Note frequency, location, SSID, and whether all devices are affected." },
      { id: "wifi-signal-quality", title: "Check RSSI and channel quality", details: "Use `netsh wlan show interfaces` to review signal strength and connection rate." },
      { id: "wifi-driver-update", title: "Update wireless adapter driver", details: "Install latest WLAN driver/firmware from OEM support portal." },
      { id: "wifi-power-settings", title: "Adjust power management settings", details: "Disable adapter power-saving option that allows Windows to turn off the device." },
      { id: "wifi-band-test", title: "Test 2.4 GHz vs 5/6 GHz bands", details: "Switch bands/SSID to identify interference or weak coverage on current band." },
      { id: "wifi-roaming-ap", title: "Check AP roaming and coverage", details: "Validate handoff between access points and look for dead zones/channel overlap." },
      { id: "wifi-stack-reset", title: "Reset network stack", details: "Run `netsh winsock reset` and `netsh int ip reset`, then reboot and reconnect." },
      { id: "wifi-router-ap-firmware", title: "Review AP/router firmware and logs", details: "Update firmware and inspect logs for deauth/disconnect reasons." }
    ],
    proTips: [
      "Intermittent drops at one location often indicate RF interference.",
      "Driver updates fix many roaming and sleep-resume disconnect bugs.",
      "Keep AP channel plans coordinated to reduce co-channel congestion."
    ]
  },
  {
    slug: "network-drive-prompting-for-credentials-constantly",
    title: "Network Drive Prompting for Credentials Constantly",
    category: "Network",
    summary: "Stops repeated SMB credential prompts by correcting auth, cache, and name-resolution issues.",
    checklist: [
      { id: "credprompt-path-verify", title: "Verify UNC path and domain context", details: "Confirm users access correct `\\\\server\\share` path using expected domain account." },
      { id: "credprompt-clear-cache", title: "Clear stale cached credentials", details: "Remove old entries in Credential Manager and run `net use * /delete /y`." },
      { id: "credprompt-reconnect-drive", title: "Remap drive with correct identity", details: "Reconnect using `net use X: \\\\server\\share /persistent:yes` with proper user context." },
      { id: "credprompt-time-sync", title: "Validate time synchronization", details: "Ensure client/server clocks are aligned to avoid Kerberos ticket failures." },
      { id: "credprompt-spn-dns", title: "Check DNS/SPN consistency", details: "Use `nslookup <server>` and confirm hostname maps to correct server SPN target." },
      { id: "credprompt-kerberos-ntlm", title: "Inspect auth protocol fallback", details: "Review security logs for Kerberos failures causing repeated NTLM prompts." },
      { id: "credprompt-gpo-policy", title: "Review drive mapping and auth policies", details: "Confirm GPO scripts and security policy are not remapping with wrong credentials." },
      { id: "credprompt-verify-session", title: "Retest after lock/unlock and reboot", details: "Validate credentials persist across logoff/reboot without recurring prompts." }
    ],
    proTips: [
      "Mixing IP paths and hostname paths often breaks seamless Kerberos auth.",
      "One bad saved credential can trigger prompt loops for all shares.",
      "Consistent DNS and time are foundational for stable SMB authentication."
    ]
  },
  {
    slug: "cannot-access-local-server-via-name-dns-resolution",
    title: "Cannot Access Local Server via Name (DNS Resolution)",
    category: "Network",
    summary: "Restores hostname access by repairing DNS records, client cache, and suffix/search behavior.",
    checklist: [
      { id: "dns-name-vs-ip-test", title: "Compare name access vs IP access", details: "Confirm `\\\\<ip>\\share` or app-by-IP works while hostname fails." },
      { id: "dns-lookup-check", title: "Run DNS lookup tests", details: "Execute `nslookup <hostname>` and verify returned record matches expected server IP." },
      { id: "dns-client-config", title: "Validate client DNS server settings", details: "Run `ipconfig /all` and ensure DNS servers point to correct internal resolvers." },
      { id: "dns-cache-flush", title: "Flush stale DNS cache", details: "Run `ipconfig /flushdns` and retest hostname resolution." },
      { id: "dns-record-audit", title: "Audit server DNS records", details: "Verify A/AAAA/PTR entries exist and remove stale duplicate records." },
      { id: "dns-suffix-search", title: "Check DNS suffix/search list", details: "Confirm client appends correct domain suffix when short names are used." },
      { id: "dns-hosts-file", title: "Inspect local hosts override", details: "Review `C:\\Windows\\System32\\drivers\\etc\\hosts` for incorrect manual mappings." },
      { id: "dns-replication-health", title: "Validate DNS zone replication", details: "Ensure AD-integrated DNS replication is healthy across domain controllers." }
    ],
    proTips: [
      "If IP works but name fails, focus on DNS not SMB/app permissions.",
      "Short-name access failures often come from missing DNS suffix configuration.",
      "Stale duplicate A records can cause intermittent resolution behavior."
    ]
  },
  {
    slug: "switch-port-dead-or-flapping",
    title: "Switch Port Dead / Flapping",
    category: "Network Infrastructure",
    summary: "Restores link stability by isolating physical faults, negotiation issues, and switch policies.",
    checklist: [
      { id: "switch-port-led-status", title: "Check physical link indicators", details: "Inspect switch and endpoint link LEDs for no-link or rapid up/down behavior." },
      { id: "switch-cable-swap", title: "Swap patch cable and endpoint port", details: "Use known-good cable and alternate endpoint NIC port to isolate failures." },
      { id: "switch-port-config", title: "Review switch port configuration", details: "Validate VLAN, speed/duplex, port-security, and STP settings on affected interface." },
      { id: "switch-error-counters", title: "Inspect interface error counters", details: "Check CRC, drops, and flaps via switch CLI (`show interface` style commands)." },
      { id: "switch-loop-detection", title: "Check for loop or BPDU events", details: "Review STP logs for topology changes, loop guard, or BPDU guard triggers." },
      { id: "switch-poe-status", title: "Validate PoE delivery if applicable", details: "Confirm PoE budget/class supports connected device and no power faults exist." },
      { id: "switch-firmware-health", title: "Review switch firmware and hardware alarms", details: "Check for known bugs/temperature/power issues and update firmware if required." },
      { id: "switch-port-retest", title: "Move endpoint and retest stability", details: "Temporarily move device to another known-good port and monitor for recurrence." }
    ],
    proTips: [
      "High CRC errors usually point to cabling or physical layer issues.",
      "Port-security violations can look like random disconnects to users.",
      "Document flap intervals to correlate with power events or loops."
    ]
  },
  {
    slug: "slow-speed-on-vpn-only",
    title: "Slow Speed on VPN Only",
    category: "Remote Access",
    summary: "Improves VPN performance by isolating tunnel overhead, routing, and endpoint bottlenecks.",
    checklist: [
      { id: "vpnslow-baseline-compare", title: "Compare on/off VPN performance", details: "Run speed/latency tests with VPN disconnected and connected to quantify impact." },
      { id: "vpnslow-latency-loss", title: "Measure tunnel latency and packet loss", details: "Run `ping`/`tracert` to VPN gateway and internal targets for bottleneck clues." },
      { id: "vpnslow-protocol-test", title: "Test VPN protocol/profile options", details: "Switch between available tunnel protocols/profile settings if policy allows." },
      { id: "vpnslow-split-tunnel", title: "Review split vs full tunnel policy", details: "Confirm expected routing; full tunnel may backhaul all traffic and reduce speed." },
      { id: "vpnslow-local-network", title: "Check home/local network quality", details: "Test on alternate network/hotspot to rule out ISP or Wi-Fi limitations." },
      { id: "vpnslow-endpoint-load", title: "Inspect endpoint CPU and security overhead", details: "Check if encryption or endpoint security agents spike CPU during VPN usage." },
      { id: "vpnslow-client-update", title: "Update VPN client and adapter drivers", details: "Install latest VPN client build and NIC/WLAN drivers." },
      { id: "vpnslow-gateway-capacity", title: "Assess VPN gateway utilization", details: "Review concentrator capacity/session load and escalate if saturation is observed." }
    ],
    proTips: [
      "Hotspot comparison is a fast way to isolate home ISP routing issues.",
      "Split tunneling often improves user experience for non-corporate traffic.",
      "Collect before/after metrics when tuning VPN policy."
    ]
  },
  {
    slug: "esim-cellular-activation-failures",
    title: "eSIM / Cellular Activation Failures",
    category: "Mobile & MDM",
    tags: ["mobile", "software"],
    summary: "Fixes cellular activation issues by validating carrier provisioning and device radio state.",
    checklist: [
      { id: "esim-airplane-toggle", title: "Toggle Airplane Mode", details: "Turn Airplane Mode on for 10 seconds, then off to force modem renegotiation with the carrier." },
      { id: "esim-carrier-status", title: "Check carrier outage status", details: "Verify Verizon/AT&T/T-Mobile status to rule out regional routing or provisioning outages." },
      { id: "esim-reset-network", title: "Reset network settings", details: "On iOS/Android run Reset Network Settings to clear corrupted carrier and network state." },
      { id: "esim-qr-validity", title: "Validate QR activation code", details: "Confirm the eSIM QR is still valid; most carrier QR codes are single-use only." },
      { id: "esim-os-update", title: "Update device OS", details: "Install the latest iOS/Android updates because modem/carrier bundle fixes are often included." },
      { id: "esim-stale-profiles", title: "Remove stale cellular profiles", details: "Delete old or deactivated eSIM profiles from Cellular settings before retrying activation." },
      { id: "esim-eid-provision", title: "Confirm EID backend provisioning", details: "Read the device EID to the carrier and verify it is actually provisioned on their backend." },
      { id: "esim-hard-restart", title: "Perform hard restart", details: "Run a full hardware-level restart to clear baseband and modem cache before retrying." }
    ],
    proTips: [
      "Carrier-side provisioning errors often appear as generic activation failed prompts.",
      "Use a newly generated QR code if previous attempts exceeded retry limits.",
      "Capture EID and IMEI before resets to speed carrier escalation."
    ]
  },
  {
    slug: "exchange-work-email-not-syncing",
    title: "Exchange / Work Email Not Syncing",
    category: "Mobile & MDM",
    tags: ["mobile", "software"],
    summary: "Restores work email sync on managed iOS/Android devices using policy and token checks.",
    checklist: [
      { id: "exch-mdm-compliance", title: "Check MDM compliance status", details: "Open Intune Company Portal or Jamf app and ensure device is compliant." },
      { id: "exch-activesync-policy", title: "Verify ActiveSync / Conditional Access", details: "Confirm account is not blocked by VPN, compliance, or access policy requirements." },
      { id: "exch-android-cache", title: "Clear app cache on Android", details: "Force stop Outlook and clear app cache in Android app settings." },
      { id: "exch-background-refresh", title: "Enable background sync", details: "Ensure iOS Background App Refresh or Android unrestricted battery is enabled for mail app." },
      { id: "exch-profile-recreate", title: "Delete and recreate mail profile", details: "Remove account profile and add it again to refresh expired or corrupted sync tokens." },
      { id: "exch-time-auto", title: "Check automatic date/time", details: "Set device date/time to automatic so SSL and auth tokens validate correctly." },
      { id: "exch-webmail-test", title: "Test mailbox in webmail", details: "Sign into webmail on mobile browser to rule out account disablement or service issues." },
      { id: "exch-reset-mfa-tokens", title: "Reset active sessions/MFA tokens", details: "Revoke sessions in admin portal to force fresh auth and token issuance on mobile." }
    ],
    proTips: [
      "If webmail works while Mail fails, focus on local account token/cache issues.",
      "Repeated password prompts often indicate stale OAuth tokens, not bad credentials.",
      "Keep one known-good test mailbox for quick baseline comparisons."
    ]
  },
  {
    slug: "mdm-intune-jamf-enrollment-hanging",
    title: "MDM (Intune/Jamf) Enrollment Hanging",
    category: "Mobile & MDM",
    tags: ["mobile", "software"],
    summary: "Fixes stuck Intune/Jamf enrollment by validating licensing, profiles, and push services.",
    checklist: [
      { id: "mdm-os-compat", title: "Confirm OS compatibility", details: "Verify device meets minimum OS version required by enrollment policy." },
      { id: "mdm-browser-cache", title: "Clear browser cache", details: "Clear default browser cache/cookies since enrollment token handoff is web-driven." },
      { id: "mdm-remove-old-profiles", title: "Remove existing management profiles", details: "Delete old profiles in VPN & Device Management from prior employer/tenant." },
      { id: "mdm-license-check", title: "Verify user licensing", details: "Confirm user has assigned EMS/Intune/Jamf entitlement required for enrollment." },
      { id: "mdm-apns-status", title: "Validate APNs certificate status", details: "For Apple devices, ensure MDM APNs certificate is valid and not expired." },
      { id: "mdm-device-limit", title: "Check enrollment device limit", details: "Ensure user has not exceeded allowed enrolled-device count." },
      { id: "mdm-network-switch", title: "Test alternate network path", details: "Switch from guest Wi-Fi to cellular to avoid blocked MDM/APNs ports (for example 5223)." },
      { id: "mdm-factory-reset", title: "Factory wipe when ownership lock persists", details: "If previously supervised by another org, wipe and re-onboard through proper release flow." }
    ],
    proTips: [
      "Clock drift and TLS inspection are top causes of silent enrollment hangs.",
      "Duplicate stale device records in MDM can block new enrollment completion.",
      "Capture serial number and assigned profile name before re-enrollment."
    ]
  },
  {
    slug: "enterprise-wi-fi-802-1x-connection-fails",
    title: "Enterprise Wi-Fi (802.1x) Connection Fails",
    category: "Mobile & MDM",
    tags: ["mobile", "network"],
    summary: "Restores enterprise 802.1x access on mobile devices by fixing auth and profile mismatches.",
    checklist: [
      { id: "wifi802-forget", title: "Forget and reconnect network", details: "Delete the enterprise SSID profile and reconnect to start a fresh 802.1x handshake." },
      { id: "wifi802-cert-trust", title: "Trust RADIUS certificate prompt", details: "Ensure user taps Trust/Accept when prompted for the RADIUS server certificate." },
      { id: "wifi802-mac-random", title: "Disable MAC randomization", details: "Turn off Private Wi-Fi Address/MAC randomization if NAC expects fixed hardware MAC." },
      { id: "wifi802-auth-method", title: "Validate EAP authentication method", details: "Confirm device is using required PEAP or EAP-TLS method for your RADIUS policy." },
      { id: "wifi802-ad-lockout", title: "Check account lockout status", details: "Ensure AD identity used for Wi-Fi auth is not locked or disabled." },
      { id: "wifi802-profile-expiry", title: "Check profile certificate expiry", details: "If Wi-Fi is MDM-pushed, confirm payload cert has not expired." },
      { id: "wifi802-nps-logs", title: "Review NPS/RADIUS logs", details: "Inspect NPS logs for exact auth reject reason and policy condition failure." },
      { id: "wifi802-reset-network", title: "Reset device network settings", details: "Clear full network cache to remove hidden conflicting network profiles." }
    ],
    proTips: [
      "Most 802.1x failures are certificate trust or identity mismatch issues.",
      "Comparing one good and one failed device quickly narrows policy drift.",
      "Collect precise auth failure timestamp for RADIUS log correlation."
    ]
  },
  {
    slug: "unresponsive-screen-ghost-touches",
    title: "Unresponsive Screen / Ghost Touches",
    category: "Mobile & MDM",
    tags: ["mobile", "hardware"],
    summary: "Troubleshoots touch input issues including freezes, dead zones, and phantom touches.",
    checklist: [
      { id: "touch-force-restart", title: "Force hardware restart", details: "Use device-specific hardware button combo to restart below the frozen UI layer." },
      { id: "touch-clean-screen", title: "Clean display surface", details: "Wipe display with microfiber cloth to remove moisture, oils, and contamination." },
      { id: "touch-remove-case", title: "Remove case/screen protector", details: "Remove tight case or cracked protector that can create pressure points." },
      { id: "touch-battery-swell", title: "Check for battery swelling", details: "Inspect chassis for bulging battery that may press against touch assembly." },
      { id: "touch-unplug-charger", title: "Disconnect charger", details: "Unplug low-quality charger to rule out EMI causing false touch input." },
      { id: "touch-update-firmware", title: "Update firmware/OS", details: "Install latest OS updates that include touch controller and sampling fixes." },
      { id: "touch-native-diagnostics", title: "Run native diagnostics", details: "Use built-in diagnostics (for example Samsung Members) to test raw touch grid." },
      { id: "touch-factory-reset", title: "Factory reset as last resort", details: "Wipe device to rule out software-level process conflicts before hardware replacement." }
    ],
    proTips: [
      "Ghost interactions that worsen on charger can indicate power or grounding issues.",
      "Safe Mode success strongly suggests software or extension interference.",
      "Capture a short video of symptoms for faster vendor triage."
    ]
  },
  {
    slug: "keychain-corruption-password-prompts",
    title: "Keychain Corruption & Password Prompts",
    category: "Mac OS",
    tags: ["mac", "software"],
    summary: "Resolves repeated credential prompts caused by damaged or mismatched keychain items.",
    checklist: [
      { id: "keychain-scope", title: "Identify affected apps and prompts", details: "Document which apps prompt repeatedly and whether prompts start after password changes." },
      { id: "keychain-unlock-test", title: "Check login keychain lock state", details: "Open Keychain Access and verify login keychain unlocks without errors." },
      { id: "keychain-password-sync", title: "Synchronize keychain and account passwords", details: "If account password changed, update keychain password to match current login secret." },
      { id: "keychain-remove-stale", title: "Remove stale credential entries", details: "Delete outdated internet/app password items and reauthenticate affected apps once." },
      { id: "keychain-first-aid", title: "Repair keychain integrity", details: "Run Keychain Access repair workflow (or recreate login keychain when corruption is confirmed)." },
      { id: "keychain-icloud-check", title: "Validate iCloud Keychain sync state", details: "Ensure iCloud Keychain settings are healthy and not reintroducing bad entries." },
      { id: "keychain-cli-verify", title: "Verify with security CLI", details: "Use `security list-keychains` and `security find-generic-password` for targeted item checks." },
      { id: "keychain-recreate-login", title: "Create fresh login keychain if required", details: "Create new login keychain, retest prompts, and migrate only necessary secrets." }
    ],
    proTips: [
      "Repeated prompts after password reset usually indicate keychain password mismatch.",
      "Rebuilding only login keychain is often safer than broad keychain deletion.",
      "Export critical certificates before deep keychain cleanup."
    ]
  },
  {
    slug: "filevault-lockout-wont-accept-password",
    title: "FileVault Lockout / Won't Accept Password",
    category: "Mac OS",
    tags: ["mac", "security"],
    summary: "Restores access when FileVault preboot authentication fails for valid users.",
    checklist: [
      { id: "fv-identity-verify", title: "Perform identity verification and recovery prep", details: "Validate user identity and confirm secure access to recovery key escrow location." },
      { id: "fv-keyboard-layout", title: "Check keyboard layout and input source", details: "At preboot screen verify correct keyboard layout to avoid false password mismatch." },
      { id: "fv-recovery-key-test", title: "Attempt FileVault recovery key unlock", details: "Use escrowed recovery key at login prompt to confirm disk can be decrypted." },
      { id: "fv-user-enable-status", title: "Confirm authorized FileVault users", details: "After unlock run `fdesetup list` to verify impacted user is enabled for FileVault unlock." },
      { id: "fv-password-reset-sync", title: "Resync user password and preboot auth", details: "Reset account password then update FileVault authorization for that user." },
      { id: "fv-disk-health", title: "Run disk checks in Recovery", details: "Use `diskutil apfs list` and First Aid in Recovery to validate APFS container health." },
      { id: "fv-secure-token-check", title: "Validate Secure Token state", details: "Check secure token assignment for admin/user accounts and correct token ownership chain." },
      { id: "fv-reissue-protectors", title: "Reissue and escrow recovery controls", details: "Rotate recovery key and validate escrow after restoring normal login." }
    ],
    proTips: [
      "Wrong keyboard layout at preboot is a common false lockout cause.",
      "Always verify recovery key escrow before making auth changes.",
      "FileVault access and account login can diverge after directory password resets."
    ]
  },
  {
    slug: "application-permissions-camera-mic-failing",
    title: "Application Permissions (Camera/Mic) Failing",
    category: "Mac OS",
    tags: ["mac", "software"],
    summary: "Fixes blocked camera/microphone access caused by TCC permissions and app trust state.",
    checklist: [
      { id: "perm-app-scope", title: "Confirm affected apps and devices", details: "Identify whether failure occurs in one app or all apps and test built-in test tools." },
      { id: "perm-system-privacy", title: "Review Privacy & Security settings", details: "Check Camera and Microphone lists and ensure target app is allowed." },
      { id: "perm-restart-app", title: "Restart app after permission changes", details: "Completely quit and relaunch app to force new permission request flow." },
      { id: "perm-screen-time-policy", title: "Check Screen Time or MDM restrictions", details: "Validate no content/privacy restrictions or management profile is blocking access." },
      { id: "perm-device-conflict", title: "Close competing apps using camera/mic", details: "Terminate apps that may hold device access and prevent target app from opening streams." },
      { id: "perm-tcc-reset", title: "Reset TCC permissions for app", details: "Run `tccutil reset Camera <bundle-id>` and `tccutil reset Microphone <bundle-id>`, then retry." },
      { id: "perm-code-signing", title: "Validate app integrity and updates", details: "Update or reinstall the app if signature or entitlement mismatches are suspected." },
      { id: "perm-log-analysis", title: "Collect permission framework logs", details: "Run `log show --last 10m --predicate 'subsystem CONTAINS \"TCC\"'` for denial evidence." }
    ],
    proTips: [
      "TCC reset is often faster than manual toggle loops when prompts stop appearing.",
      "MDM privacy profiles can silently override local permission toggles.",
      "One app failing while others work usually indicates bundle-level permission state."
    ]
  },
  {
    slug: "time-machine-backup-fails",
    title: "Time Machine Backup Fails",
    category: "Mac OS",
    tags: ["mac", "backup"],
    summary: "Restores Time Machine backup reliability across disk, network target, and snapshot issues.",
    checklist: [
      { id: "tm-error-capture", title: "Capture backup error and timing", details: "Record exact Time Machine error text, target disk, and failure timestamp." },
      { id: "tm-target-health", title: "Validate backup destination health", details: "Confirm external/NAS target is mounted, writable, and has sufficient free capacity." },
      { id: "tm-disk-utility", title: "Run disk checks on source and target", details: "Use Disk Utility First Aid to check APFS/HFS integrity on both involved volumes." },
      { id: "tm-exclusions", title: "Review exclusions and oversized files", details: "Check if huge VM/library files or exclusions are causing repeated backup interruptions." },
      { id: "tm-snapshot-check", title: "Inspect local snapshots", details: "Run `tmutil listlocalsnapshots /` and thin snapshots if local space pressure exists." },
      { id: "tm-reset-backupd", title: "Restart backup services", details: "Stop and restart backup daemon with `sudo tmutil stopbackup` then retry backup." },
      { id: "tm-reselect-disk", title: "Re-select Time Machine disk", details: "Remove and re-add destination in Time Machine settings to clear stale target metadata." },
      { id: "tm-verify-recovery", title: "Validate successful backup and restore", details: "Run test restore of a sample file to confirm backup is usable, not just completed." }
    ],
    proTips: [
      "A completed backup is not enough until test restore confirms integrity.",
      "Network Time Machine targets fail often when SMB permissions drift.",
      "Snapshot buildup can block backups even when external target is healthy."
    ]
  },
  {
    slug: "mac-wont-boot-flashing-folder-stuck-logo",
    title: "Mac Won't Boot (Flashing Folder / Stuck Logo)",
    category: "Mac OS",
    tags: ["mac", "hardware"],
    summary: "Recovers non-booting Macs by validating startup disk, filesystem, and recovery path.",
    checklist: [
      { id: "macboot-symptom-capture", title: "Capture exact boot symptom", details: "Document flashing folder, progress bar stall point, and recent changes before failure." },
      { id: "macboot-recovery-mode", title: "Boot into macOS Recovery", details: "Use startup key sequence for Intel or power-hold for Apple Silicon to enter Recovery." },
      { id: "macboot-startup-disk", title: "Validate startup disk selection", details: "In Recovery Startup Disk choose correct boot volume and retry normal boot." },
      { id: "macboot-disk-first-aid", title: "Run disk repair", details: "Use Disk Utility First Aid on all APFS containers and volumes to repair corruption." },
      { id: "macboot-safe-mode-test", title: "Attempt Safe Mode boot", details: "Boot Safe Mode to bypass problematic startup extensions and login items." },
      { id: "macboot-reinstall-os", title: "Perform non-destructive macOS reinstall", details: "Reinstall macOS from Recovery while preserving user data when disk is healthy." },
      { id: "macboot-hardware-diagnostics", title: "Run Apple Diagnostics", details: "Execute startup diagnostics to detect hardware faults when software repair fails." },
      { id: "macboot-data-recovery-plan", title: "Plan data recovery and escalation", details: "If boot remains broken, recover data from Recovery/Target Disk Mode and escalate for hardware service." }
    ],
    proTips: [
      "Flashing folder usually means startup disk is missing or unreadable.",
      "Run First Aid before reinstall to avoid writing over unresolved disk issues.",
      "Always confirm backup status before major recovery actions."
    ]
  }
];
