import { Component, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-version",
    templateUrl: "./version.component.html",
    styleUrls: ["./version.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class VersionComponent {
  versions: Version[] = [];

  formGroup: FormGroup<{
    repository: FormControl<string>;
    artifactId: FormControl<string>;
    name: FormControl<string>;
  }>;

  userVersions: UserVersion[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.loadVersion("npm-hosted", "Angular Basisbibliothek", "angular-base", false);
    this.loadVersion("maven-public", "Java Spring Boot", "olb-spring-boot-parent", false);
    this.loadVersion("maven-public", "Java Vault Integration", "olb-vault-credential-spring", false);
    this.loadVersion("maven-public", "Java OpenID Connect Integration", "olb-oidc-backend-for-frontend", false);
    this.loadVersion("maven-public", "Java TACM Client", "tacm", false);
    this.loadVersion("maven-public", "Java Globalpom", "globalpom", false);
    this.loadVersion("maven-public", "Java Vespa WS Client", "vespa.ws.client", false);
    this.loadVersion("maven-public", "Java POI Client", "poi-client", false);

    this.formGroup = this.fb.group({
      name: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      artifactId: this.fb.control("", {
        nonNullable: true,
        validators: [Validators.required]
      }),
      repository: this.fb.control("maven-public", {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
    this.loadUserVersions();
  }

  private loadVersion(repository: string, name: string, artifactId: string, userVersion: boolean) {
    this.http
      .get<NexusResult>("/nexus/service/rest/v1/search/assets?sort=version&direction=desc&repository=" + repository + "&name=" + artifactId)
      .subscribe(result => {
        for (const item of result.items) {
          const version = item.npm?.version || item.maven2?.version;
          if (version.length < 10) {
            // longer version numbers have snapshot suffix
            this.versions.push({
              name: name,
              artifactId: artifactId,
              version: version,
              userVersion: userVersion
            });
            break;
          }
        }
      });
  }

  save() {
    if (this.formGroup.invalid) {
      return;
    }
    const version: UserVersion = {
      name: this.formGroup.controls.name.value,
      artifactId: this.formGroup.controls.artifactId.value,
      repository: this.formGroup.controls.repository.value
    };
    this.userVersions.push(version);
    this.loadVersion(version.repository, version.name, version.artifactId, true);
    localStorage.setItem("versions", JSON.stringify(this.userVersions));
  }

  private loadUserVersions() {
    const versionsString = localStorage.getItem("versions");
    if (!versionsString) {
      return;
    }
    this.userVersions = JSON.parse(versionsString);
    for (const userVersion of this.userVersions) {
      this.loadVersion(userVersion.repository, userVersion.name, userVersion.artifactId, true);
    }
  }

  delete(userVersion: Version) {
    this.userVersions.splice(
      this.userVersions.findIndex(version => version.artifactId === userVersion.artifactId && version.name === userVersion.name),
      1
    );
    this.versions.splice(
      this.versions.findIndex(version => version.artifactId === userVersion.artifactId && version.name === userVersion.name),
      1
    );
    localStorage.setItem("versions", JSON.stringify(this.userVersions));
  }
}

interface NexusResult {
  items: NexusItem[];
}

interface NexusItem {
  npm: NpmVersion;
  maven2: MavenVersion;
}

interface NpmVersion {
  name: string;
  version: string;
}

interface MavenVersion {
  groupId: string;
  artifactId: string;
  version: string;
}

interface Version {
  name: string;
  artifactId: string;
  version: string;
  userVersion: boolean;
}

interface UserVersion {
  repository: string;
  name: string;
  artifactId: string;
}
