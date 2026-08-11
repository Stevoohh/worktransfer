import { Component, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-filetransfers",
    templateUrl: "./filetransfers.component.html",
    styleUrl: "./filetransfers.component.scss",
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FiletransfersComponent {
  filetransferConfigs: FiletransferConfigs | undefined;

  constructor(private http: HttpClient) {
    let urlSuffix = "-prod";
    if (location.origin.includes("dev")) {
      urlSuffix = "-dev";
    } else if (location.origin.includes("int")) {
      urlSuffix = "-int";
    }
    this.http.get<FiletransferConfigs>("https://vslejigs01" + urlSuffix + ".olb.de:8443/v1/filetransfer-configs").subscribe({
      next: (filetransferConfigs: FiletransferConfigs) => {
        this.filetransferConfigs = filetransferConfigs;
      },
      error: () => {
        // Ignore
      }
    });
  }
}

interface FiletransferConfigs {
  toServer: FiletransferToServerConfig[];
  toCluster: FiletransferToClusterConfig[];
  toContainer: FiletransferToContainerConfig[];
}

interface FiletransferToServerConfig {
  filetransferId: string;
  senderKeycloakUsers: string[];
  targetServers: string[];
  targetOsUser: string;
  onErrorEmails: string;
  targetDirectory: string;
  followUpScript: string;
}

interface FiletransferToClusterConfig {
  jobId: string;
  users: string[];
  onErrorEmails: string;
  job: string;
  clusterName: string;
}

interface FiletransferToContainerConfig {
  filetransferId: string;
  senderKeycloakUsers: string[];
  senderLdapUsers: string[];
  onErrorEmails: string;
  targetDirectory: string;
  followUpScript: string;
  namespace: string;
  pod: string;
  container: string;
  clusterName: string;
}
