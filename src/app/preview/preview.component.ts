import { Component,Input } from '@angular/core';
import { ResumeService } from '../resume.service';
import { PdfService } from '../pdf.service';
import pdfMake from 'pdfmake/build/pdfmake';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  // @Input() resumeData: any;
  constructor(private resumeService: ResumeService,private pdfService:PdfService) {
 
  }
  get resumeData() {
    return this.resumeService.resumeData;
  }
  // downloadHtmlPdf() {

  //   if (!this.resumeData || !this.resumeData.profile) {
  //     console.error('Resume data is not available');
  //     return;
  //   }

  //   const documentDefinition = {
  //     content: [
  //       { text: 'Resume Preview', fontSize: 24, bold: true, margin: [0, 0, 0, 20] },
        
  //       // Profile Section
  //       { text: 'Profile', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       { text: `Name: ${this.resumeData.profile.name}`, fontSize: 12 },
  //       { text: `Email: ${this.resumeData.profile.email}`, fontSize: 12 },
  //       { text: `Phone: ${this.resumeData.profile.phone}`, fontSize: 12 },
  
  //       // Work Experience Section
  //       { text: 'Work Experience', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       {
  //         ul: this.resumeData.work.map(work => ({
  //           text: `${work.title} at ${work.company} (${work.startYear} - ${work.endYear})`,
  //           margin: [0, 2, 0, 2],
  //           ul: work.descriptions.map(desc => ({ text: desc, margin: [10, 0, 0, 0] }))
  //         }))
  //       },
  
  //       // Skills Section
  //       { text: 'Skills', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       {
  //         ul: this.resumeData.skills.map(skill => ({
  //           text: skill.name,
  //           ul: skill.tools.map(tool => ({ text: tool, margin: [10, 0, 0, 0] }))
  //         }))
  //       },
  
  //       // Projects Section
  //       { text: 'Projects', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       {
  //         ul: this.resumeData.projects.map(project => ({
  //           text: `${project.name}: ${project.description}`,
  //           ul: project.tools.map(tool => ({ text: tool, margin: [10, 0, 0, 0] }))
  //         }))
  //       },
  
  //       // Awards Section
  //       { text: 'Awards', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       {
  //         ul: this.resumeData.awards.map(award => ({
  //           text: `${award.title} from ${award.organization} (${award.year}): ${award.description}`,
  //           margin: [0, 2, 0, 2]
  //         }))
  //       },
  
  //       // Education Section
  //       { text: 'Education', fontSize: 18, bold: true, margin: [0, 10, 0, 5] },
  //       {
  //         ul: this.resumeData.education.map(edu => ({
  //           text: `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.year})`,
  //           margin: [0, 2, 0, 2]
  //         }))
  //       }
  //     ],
  //   };
  
  //   pdfMake.createPdf(documentDefinition).download('resume.pdf');
  // }
  
  downloadHtmlPdf() {
    this.pdfService.generatePdfFromHtml('content-to-download');
  }
}
