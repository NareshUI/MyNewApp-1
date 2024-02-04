import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
@Input() data : any;

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
    
  }

  close(reason:string){
    this.modalService.dismissAll();
  }

}
