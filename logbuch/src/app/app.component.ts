import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ProtokolleFilterComponent } from './protokolle-filter/protokolle-filter.component';
import { TabRouterLinksComponent } from './tab-router-links/tab-router-links.component';
import { TesttabbarComponent } from './testtabbar/testtabbar.component';

interface Tab {
  id: string;
  label: string;
  content: string;
  searchText: string;
  filteredContent: string;
  matches: number;
  currentMatch: number;
  matchPositions: number[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SafeHtmlPipe,
    ProtokolleFilterComponent,
    TabRouterLinksComponent,
    TesttabbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  tabs: Tab[] = [];
  activeTab = 'protokolle';

  constructor(private sanitizer: DomSanitizer) {
    this.tabs = [
      {
        id: 'protokolle',
        label: 'Protokolle',
        content: 'Hier können Protokolle angezeigt werden. Hier können Protokolle angezeigt werden. Hier können Protokolle angezeigt werden.',
        searchText: '',
        filteredContent: 'Hier können Protokolle angezeigt werden. Hier können Protokolle angezeigt werden. Hier können Protokolle angezeigt werden.',
        matches: 0,
        currentMatch: 0,
        matchPositions: []
      }
    ];
  }

  getSelectedIndex(): number {
    return this.tabs.findIndex(tab => tab.id === this.activeTab);
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  addNewTab(): void {
    const newTabId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      label: `Neues Protokoll ${this.tabs.length}`,
      content: 'Neuer Protokollinhalt',
      searchText: '',
      filteredContent: 'Neuer Protokollinhalt',
      matches: 0,
      currentMatch: 0,
      matchPositions: []
    };
    this.tabs.push(newTab);
    this.setActiveTab(newTabId);
  }

  removeTab(tabId: string): void {
    const index = this.tabs.findIndex(tab => tab.id === tabId);
    if (index > -1) {
      this.tabs.splice(index, 1);
      if (this.activeTab === tabId) {
        this.setActiveTab('protokolle');
      }
    }
  }

  findMatches(text: string, searchText: string): number[] {
    const matches: number[] = [];
    let match;
    const regex = new RegExp(searchText, 'gi');
    while ((match = regex.exec(text)) !== null) {
      matches.push(match.index);
    }
    return matches;
  }

  filterContent(tab: Tab): void {
    if (!tab.searchText) {
      tab.filteredContent = tab.content;
      tab.matches = 0;
      tab.currentMatch = 0;
      tab.matchPositions = [];
      return;
    }

    tab.matchPositions = this.findMatches(tab.content, tab.searchText);
    tab.matches = tab.matchPositions.length;
    tab.currentMatch = tab.matches > 0 ? 1 : 0;

    const searchRegex = new RegExp(tab.searchText, 'gi');
    const highlightedContent = tab.content.replace(
      searchRegex,
      (match, offset) => {
        const isCurrentMatch = offset === tab.matchPositions[tab.currentMatch - 1];
        return `<span class="highlight ${isCurrentMatch ? 'current-match' : ''}">${match}</span>`;
      }
    );
    tab.filteredContent = highlightedContent;
  }

  navigateMatch(tab: Tab, direction: 'next' | 'prev'): void {
    if (tab.matches === 0) return;

    if (direction === 'next') {
      tab.currentMatch = tab.currentMatch === tab.matches ? 1 : tab.currentMatch + 1;
    } else {
      tab.currentMatch = tab.currentMatch === 1 ? tab.matches : tab.currentMatch - 1;
    }

    const searchRegex = new RegExp(tab.searchText, 'gi');
    const highlightedContent = tab.content.replace(
      searchRegex,
      (match, offset) => {
        const isCurrentMatch = offset === tab.matchPositions[tab.currentMatch - 1];
        return `<span class="highlight ${isCurrentMatch ? 'current-match' : ''}">${match}</span>`;
      }
    );
    tab.filteredContent = highlightedContent;
  }

  highlightAllMatches(tab: Tab): void {
    if (!tab.searchText) return;
    
    const searchRegex = new RegExp(tab.searchText, 'gi');
    const highlightedContent = tab.content.replace(
      searchRegex,
      match => `<span class="highlight">${match}</span>`
    );
    tab.filteredContent = highlightedContent;
    console.log(highlightedContent)
  }

  exportContent(tab: Tab): void {
    const blob = new Blob([tab.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tab.label}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
