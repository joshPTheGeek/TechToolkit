(() => {
  const shared = window.TechToolkit || {};
  const app = document.getElementById("tier2-cheatsheet-app");
  if (!app) {
    return;
  }

  if (shared.initTheme) {
    shared.initTheme();
  }

  const ports = [
    ["20", "TCP", "FTP Data", "Legacy file transfer data channel"],
    ["21", "TCP", "FTP Control", "Legacy file transfer control channel"],
    ["22", "TCP", "SSH / SFTP / SCP", "Secure shell access and file transfer"],
    ["23", "TCP", "Telnet", "Legacy remote console (plaintext)"],
    ["25", "TCP", "SMTP", "Mail relay between servers"],
    ["49", "TCP", "TACACS+", "Network device AAA authentication"],
    ["53", "UDP/TCP", "DNS", "Name resolution and zone transfer"],
    ["67/68", "UDP", "DHCP", "IPv4 dynamic host configuration"],
    ["69", "UDP", "TFTP", "Simple transfer for firmware/boot images"],
    ["80", "TCP", "HTTP", "Unencrypted web traffic"],
    ["88", "TCP/UDP", "Kerberos", "AD authentication ticketing"],
    ["110", "TCP", "POP3", "Legacy mailbox retrieval"],
    ["119", "TCP", "NNTP", "Usenet/newsgroup protocol"],
    ["123", "UDP", "NTP", "Clock synchronization"],
    ["135", "TCP", "RPC Endpoint Mapper", "Windows RPC service discovery"],
    ["137/138/139", "UDP/TCP", "NetBIOS", "Legacy Windows name/session services"],
    ["143", "TCP", "IMAP4", "Mailbox synchronization"],
    ["161/162", "UDP", "SNMP", "Monitoring and SNMP traps"],
    ["179", "TCP", "BGP", "Dynamic route exchange"],
    ["389", "TCP/UDP", "LDAP", "Directory queries and binds"],
    ["427", "TCP/UDP", "SLP", "Service location protocol discovery"],
    ["443", "TCP", "HTTPS / TLS", "Secure web and API traffic"],
    ["445", "TCP", "SMB/CIFS", "Windows file and printer sharing"],
    ["465", "TCP", "SMTPS", "SMTP over implicit TLS"],
    ["500", "UDP", "IKE / ISAKMP", "IPsec VPN key exchange"],
    ["514", "UDP", "Syslog", "Centralized network/system logging"],
    ["546/547", "UDP", "DHCPv6", "IPv6 address configuration"],
    ["548", "TCP", "AFP", "Legacy Apple file sharing"],
    ["587", "TCP", "SMTP Submission", "Authenticated outbound email"],
    ["631", "TCP/UDP", "IPP", "Internet printing"],
    ["636", "TCP", "LDAPS", "Encrypted LDAP directory queries"],
    ["989/990", "TCP", "FTPS", "FTP over SSL/TLS data/control"],
    ["993", "TCP", "IMAPS", "Secure IMAP mailbox sync"],
    ["995", "TCP", "POP3S", "Secure POP3 retrieval"],
    ["1194", "UDP/TCP", "OpenVPN", "OpenVPN tunnel transport"],
    ["1433", "TCP", "MS SQL Server", "Microsoft SQL database service"],
    ["1434", "UDP", "SQL Browser", "SQL Server instance discovery"],
    ["1701", "UDP", "L2TP", "Layer 2 Tunneling Protocol"],
    ["1723", "TCP", "PPTP", "Legacy VPN tunneling"],
    ["1812/1813", "UDP", "RADIUS", "AAA authentication and accounting"],
    ["2049", "TCP/UDP", "NFS", "Unix/Linux network file sharing"],
    ["3260", "TCP", "iSCSI", "Block-level storage over IP"],
    ["3268/3269", "TCP", "Global Catalog / SSL", "AD forest-wide directory queries"],
    ["3306", "TCP", "MySQL", "MySQL database service"],
    ["3389", "TCP", "RDP", "Remote desktop protocol"],
    ["4500", "UDP", "IPsec NAT-T", "IPsec traversal through NAT"],
    ["5060/5061", "UDP/TCP", "SIP / SIP-TLS", "VoIP session signaling"],
    ["5432", "TCP", "PostgreSQL", "PostgreSQL database service"],
    ["5900", "TCP", "VNC", "Remote graphical console"],
    ["5985/5986", "TCP", "WinRM / WinRM HTTPS", "Windows remote management"],
    ["6514", "TCP", "Syslog TLS", "Encrypted syslog transport"],
    ["8080", "TCP", "HTTP Alternate", "Web proxy/application services"],
    ["8443", "TCP", "HTTPS Alternate", "Secure admin portals"]
  ];

  const winCommands = [
    { cmd: "ipconfig /all", desc: "Show full network configuration." },
    { cmd: "ipconfig /flushdns", desc: "Clear local DNS resolver cache." },
    { cmd: "ping <host>", desc: "Test reachability and baseline latency." },
    { cmd: "tracert <host>", desc: "Show route hops to destination." },
    { cmd: "netstat -ano", desc: "List active sockets and process IDs." },
    { cmd: "nslookup <name>", desc: "Query DNS records directly." },
    { cmd: "sfc /scannow", desc: "Repair protected Windows system files." },
    { cmd: "DISM /Online /Cleanup-Image /RestoreHealth", desc: "Repair Windows component store image." },
    { cmd: "Get-EventLog -LogName System -Newest 30", desc: "Pull recent system events quickly." },
    { cmd: "Test-NetConnection <host> -Port <port>", desc: "Validate TCP port connectivity." }
  ];

  const unixCommands = [
    { cmd: "ifconfig  (or ip a)", desc: "List local interfaces and addresses." },
    { cmd: "ping -c 4 <host>", desc: "Run quick reachability check." },
    { cmd: "traceroute <host>", desc: "Trace path across routed hops." },
    { cmd: "nslookup <name>  (or dig <name>)", desc: "Run DNS lookup with resolver visibility." },
    { cmd: "netstat -tulpn  (or ss -tulpn)", desc: "Show listening sockets and owning services." },
    { cmd: "top  (or htop)", desc: "View live CPU/memory process usage." },
    { cmd: "df -h", desc: "Summarize filesystem free space." },
    { cmd: "du -sh *", desc: "Show folder sizes in current path." },
    { cmd: "tail -f /var/log/system.log", desc: "Follow system logs in real time." },
    { cmd: "chmod/chown", desc: "Set file mode bits and ownership." }
  ];

  const osiLayers = [
    { name: "Layer 7 - Application", details: "User-facing protocols and apps. Examples: HTTP, DNS, SMTP." },
    { name: "Layer 6 - Presentation", details: "Data format and encryption. Examples: TLS, encoding, compression." },
    { name: "Layer 5 - Session", details: "Session setup/teardown and dialog control between systems." },
    { name: "Layer 4 - Transport", details: "End-to-end delivery and reliability. Examples: TCP, UDP, ports." },
    { name: "Layer 3 - Network", details: "Routing and logical addressing. Examples: IP, ICMP, routers." },
    { name: "Layer 2 - Data Link", details: "MAC addressing and frames on local segment. Examples: Ethernet, ARP, VLANs." },
    { name: "Layer 1 - Physical", details: "Cables, wireless signal, connectors, electrical/optical transport." }
  ];

  app.innerHTML = `
    ${shared.renderNav ? shared.renderNav("cheatsheet.html") : ""}

    <section class="panel hero">
      <p class="badge">Reference</p>
      <h1>Networking and Troubleshooting Cheat Sheet</h1>
      <p class="summary">Certification-aligned quick reference for A+, Network+, and Security+ style troubleshooting.</p>
    </section>

    <section class="panel">
      <h2>Ports and Protocols (A+/Network+/Security+ Coverage)</h2>
      <p class="small-muted">Includes the most commonly tested and field-used ports/protocols. Always validate against your current objective version and vendor implementation.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Port</th>
              <th>Protocol</th>
              <th>Service</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            ${ports
              .map(
                (row) => `
                  <tr>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Common Troubleshooting Commands</h2>
      <div class="fundamentals-grid">
        <article class="category-card">
          <h3>Windows / PowerShell</h3>
          <div class="command-grid">
            ${winCommands
              .map(
                (item) => `
                  <article class="command-card">
                    <code>${item.cmd}</code>
                    <p>${item.desc}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
        <article class="category-card">
          <h3>Linux / macOS</h3>
          <div class="command-grid">
            ${unixCommands
              .map(
                (item) => `
                  <article class="command-card">
                    <code>${item.cmd}</code>
                    <p>${item.desc}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>

    <section class="panel">
      <h2>Fundamentals Explorer</h2>
      <div class="fundamentals-grid">
        <article class="category-card">
          <h3>OSI Model Explorer and Diagram</h3>
          <p class="small-muted">Visual map of the 7 layers. Click a layer for details.</p>
          <div class="osi-diagram" role="img" aria-label="OSI model seven layered diagram">
            ${osiLayers
              .map(
                (layer, index) => `
                  <button class="osi-diagram-layer" data-layer-index="${index}" type="button">
                    ${layer.name}
                  </button>
                `
              )
              .join("")}
          </div>
          <div id="osi-layer-details" class="subnet-result">${osiLayers[0].details}</div>
        </article>

        <article class="category-card">
          <h3>Live Subnetting Tool</h3>
          <p class="small-muted">Enter CIDR (for example, 192.168.10.0/24).</p>
          <label class="search-wrap" style="margin-top: 0;">
            <span>CIDR Input</span>
            <input id="cidr-input" type="text" value="192.168.10.0/24" />
          </label>
          <button id="subnet-calc-btn" type="button">Calculate</button>
          <div id="subnet-output" class="subnet-result"></div>
        </article>
      </div>
    </section>

    <section class="panel">
      <h2>Reference Navigation</h2>
      <div class="button-grid">
        <a class="button-link" href="troubleshooting-method.html">Open IT Troubleshooting Method</a>
      </div>
    </section>
  `;

  if (shared.bindThemeToggle) {
    shared.bindThemeToggle();
  }

  function bindOsiButtons(selector) {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.getAttribute("data-layer-index"));
        const details = document.getElementById("osi-layer-details");
        if (!details || Number.isNaN(index) || !osiLayers[index]) {
          return;
        }
        details.textContent = osiLayers[index].details;
      });
    });
  }

  bindOsiButtons(".osi-diagram-layer");

  const cidrInput = document.getElementById("cidr-input");
  const calcButton = document.getElementById("subnet-calc-btn");
  const output = document.getElementById("subnet-output");

  function ipToInt(ip) {
    const octets = ip.split(".").map((part) => Number(part));
    if (octets.length !== 4 || octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
      return null;
    }
    return (
      ((octets[0] << 24) >>> 0) +
      ((octets[1] << 16) >>> 0) +
      ((octets[2] << 8) >>> 0) +
      (octets[3] >>> 0)
    ) >>> 0;
  }

  function intToIp(num) {
    return `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`;
  }

  function calculateSubnet(cidr) {
    const parts = cidr.trim().split("/");
    if (parts.length !== 2) {
      return "Invalid CIDR format. Use x.x.x.x/nn";
    }
    const prefix = Number(parts[1]);
    if (!Number.isInteger(prefix) || prefix < 1 || prefix > 30) {
      return "Prefix must be between /1 and /30.";
    }
    const ip = ipToInt(parts[0]);
    if (ip === null) {
      return "Invalid IPv4 address.";
    }

    const hostBits = 32 - prefix;
    const mask = ((0xffffffff << hostBits) >>> 0) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const firstHost = network + 1;
    const lastHost = broadcast - 1;
    const hostCount = Math.max(0, 2 ** hostBits - 2);

    return [
      `Network: ${intToIp(network)}/${prefix}`,
      `Subnet Mask: ${intToIp(mask)}`,
      `Usable Host Range: ${intToIp(firstHost)} - ${intToIp(lastHost)}`,
      `Broadcast: ${intToIp(broadcast)}`,
      `Usable Hosts: ${hostCount}`
    ].join("\n");
  }

  function renderSubnet() {
    if (!cidrInput || !output) {
      return;
    }
    output.textContent = calculateSubnet(cidrInput.value);
  }

  if (calcButton) {
    calcButton.addEventListener("click", renderSubnet);
  }
  if (cidrInput) {
    cidrInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        renderSubnet();
      }
    });
  }

  renderSubnet();
})();
