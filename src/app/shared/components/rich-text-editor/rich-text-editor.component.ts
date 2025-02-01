import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-rich-text-editor',
  standalone: false,

  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss'
})
export class RichTextEditorComponent implements OnInit {
  content: string = ''; // Holds editor content
  isSaved: boolean = true;

  // Define the Quill toolbar options
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Text formatting
      [{ 'header': [1, 2, 3, false] }], // Headings
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'align': [] }], // Alignment
      ['link', 'image'], // Links & images
    ]
  }
  quillInstance: any;
  onEditorCreated(quill: any) {
    this.quillInstance = quill;
    // Custom image handler for selecting an image from the local device
    const imageHandler = () => {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.click(); // Trigger file input dialog

      // When file is selected
      fileInput.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) { // Check if the file is an image
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result as string;
            const range = this.quillInstance.getSelection();
            const image = `<img src="${imageUrl}" style="max-height: 300px; width: auto;">`;
            this.quillInstance.clipboard.dangerouslyPasteHTML(range.index, image);
          };
          reader.readAsDataURL(file); // Read the image as a data URL
        } else {
          alert('Please select a valid image file.');
        }
      };
    };

    // Add the custom handler to the image button in the toolbar
    this.quillInstance.getModule('toolbar').addHandler('image', imageHandler);
  }
  ngOnInit(): void {
  }

  onEdit() {
    this.isSaved = false;

  }

  onSave() {
    this.isSaved = true;
  }

  goBack() {
    this.isSaved = true;
  }
}
