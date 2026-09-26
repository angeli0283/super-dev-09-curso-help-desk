import { Component, inject, signal } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { TicketAssociar, TicketResposta } from '../../../models/tickets.model';
import { RouterLink } from '@angular/router';
import { UsuarioResposta } from '../../../models/usuarios.model';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../../shared/modal/modal';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar',
  imports: [RouterLink, Modal,FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.scss',
})
export class Listar {
  ticketService = inject(TicketService);
  usuariosServce = inject(UsuarioService);

  tickets = signal<TicketResposta[]>([]);
  modalAssociarAberta = signal<boolean>(false);
  ticketAssociar: TicketAssociar = {
    idUsuario: null
  }
  usuarios = signal<UsuarioResposta[]>([]);
  ticketSelecionado = signal<number | null>(null);

  ngOnInit(){
    this.carregarTickets();
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listar().subscribe({
      next: usuarios => this.usuarios.set(usuarios),
      error: erro => {
        console.error(erro);
        alert("Não foi possível carregar os usuários");
      }
    })
  }

  carregarTickets(){
    this.ticketService.listar().subscribe({
      next: (tickets) => this.tickets.set(tickets),
      error: (erro) => {
        console.error(erro)
        alert("Não foi possivel carregar os tickets");
      }
    })
  }

  abrirModalAssociar(ticketId: number){
    this.ticketSelecionado.set(ticketId);
    this.modalAssociarAberta.set(true);
  }

  associar(){
    this.ticketService.associar(this.ticketSelecionado(), this.ticketAssociar).subscribe({
      next: () => {
        alert("Ticket associado com sucesso");
        this.carregarTickets();
      }
      error: erro => {
        console.error(erro);
        alert("Não foi possível associar o ticket");
      }  }
}