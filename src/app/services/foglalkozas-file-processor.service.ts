import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

export interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

@Injectable({
  providedIn: 'root'
})
export class FoglalkozasFileProcessorService {

  constructor(private http: HttpClient) { }

  loadFile(filePath: string): Observable<TreeNode> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(data => this.processFile(data))
    );
  }

  loadFromText(foglalkozasok_text: string): Observable<TreeNode> {
    return of(foglalkozasok_text).pipe(
      map(data => this.processFile(data))
    );
  }

  private processFile(data: string): TreeNode {
    const root: TreeNode = { name: 'root', id: 0, children: [] };
    const lines = data.split('\n');

    lines.forEach(line => this.processLine(line, root));

    return root;
  }

  private processLine(line: string, root: TreeNode) {
    const regex = /^(\d\.+(\d\.*)*)\s+(.+)$/;
    const match = line.trim().match(regex);

    if (match) {
      const numberPart = match[1];
      const title = match[3];
      const levels = numberPart.split('.').map(num => parseInt(num, 10));
      levels.pop()

      let currentNode = root;
      levels.forEach((level, index) => {
        const existingNode = currentNode.children.find(child => child.id === level);

        if (existingNode) {
          currentNode = existingNode;
        } else {
          const newNode: TreeNode = { name: "", id: level, children: [] };
          currentNode.children.push(newNode);
          currentNode = newNode;
        }
        if (currentNode.name === "" && index === levels.length - 1) {
          currentNode.name = title;
        }
      });

    }
  }

}
