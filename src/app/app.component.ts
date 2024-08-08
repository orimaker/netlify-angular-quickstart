import { Component, OnInit } from '@angular/core';
import { FoglalkozasFileProcessorService, TreeNode } from './services/foglalkozas-file-processor.service';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../demo-styling.css', '/app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-quickstart';

  rawFile: string = "";
  tree: any = null;
  flatData: string[] = [];
  filteredData: string[] = [];
  searchQuery: string = '';

  constructor(private fileService: FoglalkozasFileProcessorService, private supabaseService: SupabaseService) { }

  async ngOnInit() {
    this.rawFile = await this.supabaseService.getFoglalkozasokFile();
    //this.fileService.loadFile('assets/foglalkozasok.txt').subscribe(
    this.fileService.loadFromText(this.rawFile).subscribe(
      data => {
        this.tree = data;
        this.walkTree(this.tree, "");
        this.filteredData = this.flatData;
      },
      err => console.error(err)
    );
  }

  walkTree(rootNode: TreeNode, parentId: string) {
    let currentNode = rootNode;
    let parentAndCurrentId = currentNode.id === 0 ? "" : parentId !== "" ? `${parentId}.${currentNode.id}` : `${currentNode.id}`;
    if (currentNode.id !== 0) {
      this.flatData.push(`${parentAndCurrentId} ${currentNode.name}`);
    }
    currentNode.children.forEach(child => this.walkTree(child, parentAndCurrentId));
  }

  onSearch(event: any) {
    console.log(event.target.value);
    this.filteredData = this.flatData.filter(entry => entry.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
