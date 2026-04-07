import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from 'codemirror';

type TabId = 'editor' | 'stats' | 'about';

@Component({
  selector: 'app-log-tabs',
  imports: [MatTabsModule],
  templateUrl: './log-tabs.component.html',
  styleUrl: './log-tabs.component.scss'
})
export class LogTabsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorHost', { static: true }) private editorHost?: ElementRef<HTMLDivElement>;

  protected readonly tabs = [
    { id: 'editor' as TabId, label: 'Log Editor' },
    { id: 'stats' as TabId, label: 'Statistik' },
    { id: 'about' as TabId, label: 'Info' }
  ];

  protected readonly activeTab = signal<TabId>('editor');
  protected readonly sampleLog = this.buildSampleLog(260);

  private editorView?: EditorView;

  ngAfterViewInit(): void {
    if (!this.editorHost) {
      return;
    }

    const state = EditorState.create({
      doc: this.sampleLog,
      extensions: [basicSetup, javascript()]
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorHost.nativeElement
    });
  }

  ngOnDestroy(): void {
    this.editorView?.destroy();
  }

  protected setActiveTab(tab: TabId): void {
    this.activeTab.set(tab);
  }

  private buildSampleLog(lines: number): string {
    const output: string[] = [];
    const start = new Date('2026-04-02T08:00:00.000Z');

    for (let i = 1; i <= lines; i++) {
      const timestamp = new Date(start.getTime() + i * 30_000).toISOString();
      const level = i % 37 === 0 ? 'ERROR' : i % 11 === 0 ? 'WARN ' : 'INFO ';
      const duration = 40 + (i % 120);
      const line =
        `${timestamp} ${level} [PipelineWorker-${(i % 4) + 1}] job=ingest-${1000 + i} source=node-${(i % 8) + 1} duration=${duration}ms ` +
        `trace=region/eu-central-1/service/log-aggregator/cluster/core/node-${(i % 20) + 1}/segment/${i}/batch/${100000 + i} ` +
        `payload="user=worker-${i};scope=ingestion;stage=validate;checksum=sha256:ab12cd34ef56gh78ij90klmnopqrstuvwx${(i % 10) + 1}"`;
      output.push(line);

      if (i % 37 === 0) {
        output.push(
          `${timestamp} ERROR [PipelineWorker-${(i % 4) + 1}] stack=TimeoutException: request exceeded retry window`
        );
      }
    }

    return output.join('\n');
  }
}
