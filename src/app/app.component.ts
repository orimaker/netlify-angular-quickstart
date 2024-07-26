import { Component, OnInit } from '@angular/core';
import { FoglalkozasFileProcessorService, TreeNode } from './services/foglalkozas-file-processor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../demo-styling.css']
})
export class AppComponent implements OnInit {
  title = 'angular-quickstart';

  tree: any = null;
  flatData: string[] = [];

  constructor(private fileService: FoglalkozasFileProcessorService) { }

  ngOnInit() {

    this.fileService.loadFile('assets/foglalkozasok.txt').subscribe(
      data => { this.tree = data; this.walkTree(this.tree,""); },
      err => console.error(err)
    );

  }

  walkTree(rootNode: TreeNode, parentId: string) {
    let currentNode = rootNode;
    let parentAndCurrentId = currentNode.id === 0 ? "" : parentId!== "" ? `${parentId}.${currentNode.id}`: `${currentNode.id}`;
    if (currentNode.id !== 0) {
      this.flatData.push(`${parentAndCurrentId} ${currentNode.name}`);
    }
    currentNode.children.forEach(child => this.walkTree(child, parentAndCurrentId));
  }
}
