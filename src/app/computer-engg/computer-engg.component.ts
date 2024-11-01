import { Component } from '@angular/core';

interface subjects{
  subject:string;
  resource:string;
  pyq:string;
  yt:string;
}

@Component({
  selector: 'app-computer-engg',
  templateUrl: './computer-engg.component.html',
  styleUrl: './computer-engg.component.css'
})
export class ComputerEnggComponent {
  sem1subject:subjects[]=[
    {subject:'Basic Electronics Technology',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Mathematics 1',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Chemistry',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'English',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem2subject:subjects[]=[
    {subject:'Physics',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Mathematics 2',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Programming for Problem Solving',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Engineering Graphics and Design',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem3subject:subjects[]=[
    {subject:'Analog Electronic Circuits',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Data Structure and Algorithms',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Digital Electronics',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Mathematics 3',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Effective Technical Communication',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem4subject:subjects[]=[
    {subject:'Discrete Mathematics',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Computer Organization and Architecture',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Operating System',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Design and Analysis of Algorithms',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Economics for Engineering',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Environmental Sciences',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem5subject:subjects[]=[
    {subject:'Signals and System',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Database Management Systems',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Formal Languages Automata and Computer Design',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Object Oriented Programming',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Biology',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'COnstitution of India',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem6subject:subjects[]=[
    {subject:'Intelligent Systems',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Computer Networks',resource:'link1',pyq:'link2',yt:'link3'},
  ]
  sem7subject:subjects[]=[
    {subject:'FInancing and Accounting',resource:'link1',pyq:'link2',yt:'link3'},
    
  ]
  algoElectiveSubs: subjects[]=[
    {subject:'Graph Theory',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Advanced Algorithms',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Parallel and Distributed Algorithms',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Queuing Theory and Modeling',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Game Theory',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Information Theory',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  systemsElectiveSubs: subjects[]=[
    {subject:'Advanced Computer Architecture',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Software Engineering',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Distributed Systems',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Real Time Systems',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Ad-Hoc and Sensors Networks',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Internet Of Things',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  machineElectiveSubs: subjects[]=[
    {subject:'Machine Learning',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Data Mining',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Soft Computing',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Speech and Natural Language Processing',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Data Analytics',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Neural Networks and Deep Learning',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  appcodeElectiveSubs: subjects[]=[
    {subject:'Image Processing',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Digital Signal Processing',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Computer Graphics',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Optimization Tachniques',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Web and Internet Technology',resource:'link1',pyq:'link2',yt:'link3'},
    {subject:'Cryptography and Network Security',resource:'link1',pyq:'link2',yt:'link3'}
  ]
  sem1=0;
  sem2=0;
  sem3=0;
  sem4=0;
  sem5=0;
  sem6=0;
  sem7=0;
  sem8=0;
  elective=0;
  showNested(sem:string){
    this.sem1=0;
    this.sem2=0;
    this.sem3=0;
    this.sem4=0;
    this.sem5=0;
    this.sem6=0;
    this.sem7=0;
    this.sem8=0;
    

    this[sem]=1;
    
   
  }
  showElective(elec:string){

    this[elec]=!this[elec];
  }

}
