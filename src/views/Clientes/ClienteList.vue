<template>
  <b-row>
    <h1 class="page-title">Lista de <span class="fw-semi-bold">Clientes</span></h1>
    <b-col lg="12">
      <Widget customHeader>
        <!-- <b-button class="mr-sm" variant="primary" v-b-modal.demo>Demo</b-button> -->
        <b-button-toolbar class="mt-md mb-lg justify-content-start d-print-none">
          <b-button variant="success" v-b-modal.add>
            Adicionar novo &nbsp;
            <span class="circle bg-white">
              <i class="fa fa-plus text-success" />
            </span>
          </b-button>
        </b-button-toolbar>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>NUIT</th>
              <th>Contacto</th>
              <th>Endereco</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cliente, index) in clientes" :key="index">
              <td>{{ cliente.nome }}</td>
              <td>{{ cliente.nuit }}</td>
              <td>{{ cliente.contacto }}</td>
              <td>{{ cliente.endereco }}</td>
              <td><b-badge variant="success">Empresa</b-badge></td>
              <td>
                <b-button-group class="mb-3">
                  <b-button size="xs" variant="success" v-b-modal.edit>
                    <i class="fa fa-edit mr-0 mb-xs" />
                    Editar</b-button
                  >
                  <b-button size="xs" variant="danger">
                    <i class="fa fa-trash mr-0 mb-xs" />
                    Apagar</b-button
                  >
                </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </Widget>

      <b-modal
        id="add"
        title="Novo cliente"
        body-class="bg-white"
        cancel-variant="default"
        hide-footer
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            <b-form-group
            label="Nome do cliente"
            label-breakpoint="md"
            label-for="basic"
          >
            <v-select
              v-validate="'required'"
              name="tipo"
              id="tipo"
              v-model="tipo"
              :options="['Individual', 'Empresa']"
            />
            <span class="text-danger" v-if="errors.has('tipo')">
              {{ errors.first("tipo") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="Nome do cliente"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="nome"
              :class="{ 'form-control': true, 'is-invalid': errors.has('nome') }"
              type="text"
              id="nome"
              v-model="nome"
            />
            <span class="text-danger" v-if="errors.has('nome')">
              {{ errors.first("nome") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="NUIT"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="nuit"
              :class="{ 'form-control': true, 'is-invalid': errors.has('nuit') }"
              type="number"
              id="nuit"
              v-model="nuit"
            />
            <span class="text-danger" v-if="errors.has('nuit')">
              {{ errors.first("nuit") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="Telefone"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="contacto"
              :class="{ 'form-control': true, 'is-invalid': errors.has('contacto') }"
              type="number"
              id="contacto"
              v-model="contacto"
            />
            <span class="text-danger" v-if="errors.has('contacto')">
              {{ errors.first("contacto") }}
            </span>
          </b-form-group>

          <b-form-group label="Email " label-breakpoint="md" label-for="basic">
            <input
              v-validate="'required'"
              name="email"
              :class="{ 'form-control': true, 'is-invalid': errors.has('email') }"
              type="email"
              id="basic"
              v-model="email"
            />
            <span class="text-danger" v-if="errors.has('email')">
              {{ errors.first("email") }}
            </span>
          </b-form-group>
          <b-form-group label="Endereco " label-breakpoint="md" label-for="basic">
            <input
              v-validate="'required'"
              name="endereco"
              :class="{ 'form-control': true, 'is-invalid': errors.has('endereco') }"
              type="text"
              id="basic"
              v-model="endereco"
            />
            <span class="text-danger" v-if="errors.has('endereco')">
              {{ errors.first("endereco") }}
            </span>
          </b-form-group>
          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="onSubmit"
            >
              Salvar
            </b-button>
            <b-button type="button" variant="default" class="btn-rounded">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
      <b-modal
        id="edit"
        title="Actualizar cliente"
        body-class="bg-white"
        cancel-variant="default"
        hide-footer
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            <b-form-group
            label="Nome do cliente"
            label-breakpoint="md"
            label-for="basic"
          >
            <v-select
              v-validate="'required'"
              name="tipo"
              id="tipo"
              v-model="tipo"
              :options="['Individual', 'Empresa']"
            />
            <span class="text-danger" v-if="errors.has('tipo')">
              {{ errors.first("tipo") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="Nome do cliente"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="nome"
              :class="{ 'form-control': true, 'is-invalid': errors.has('nome') }"
              type="text"
              id="nome"
              v-model="nome"
            />
            <span class="text-danger" v-if="errors.has('nome')">
              {{ errors.first("nome") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="NUIT"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="nuit"
              :class="{ 'form-control': true, 'is-invalid': errors.has('nuit') }"
              type="number"
              id="nuit"
              v-model="nuit"
            />
            <span class="text-danger" v-if="errors.has('nuit')">
              {{ errors.first("nuit") }}
            </span>
          </b-form-group>
          <b-form-group
            <b-form-group
            label="Telefone"
            label-breakpoint="md"
            label-for="basic"
          >
            <input
              v-validate="'required'"
              name="contacto"
              :class="{ 'form-control': true, 'is-invalid': errors.has('contacto') }"
              type="number"
              id="contacto"
              v-model="contacto"
            />
            <span class="text-danger" v-if="errors.has('contacto')">
              {{ errors.first("contacto") }}
            </span>
          </b-form-group>

          <b-form-group label="Email " label-breakpoint="md" label-for="basic">
            <input
              v-validate="'required'"
              name="email"
              :class="{ 'form-control': true, 'is-invalid': errors.has('email') }"
              type="email"
              id="basic"
              v-model="email"
            />
            <span class="text-danger" v-if="errors.has('email')">
              {{ errors.first("email") }}
            </span>
          </b-form-group>
          <b-form-group label="Endereco " label-breakpoint="md" label-for="basic">
            <input
              v-validate="'required'"
              name="endereco"
              :class="{ 'form-control': true, 'is-invalid': errors.has('endereco') }"
              type="text"
              id="basic"
              v-model="endereco"
            />
            <span class="text-danger" v-if="errors.has('endereco')">
              {{ errors.first("endereco") }}
            </span>
          </b-form-group>
          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="onSubmit"
            >
              Salvar
            </b-button>
            <b-button type="button" variant="default" class="btn-rounded">
              Cancelar
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import http from "../../../http-common.js";
import vSelect from "vue-select";
export default {
  components: { vSelect },
  data() {
    return {
      nome: "",
      tipo: "",
      contacto: "",
      email: "",
      nuit: "",
      endereco: "",
      clientes: [],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      this.$validator.validateAll().then((isValid) => {
        if (isValid) {
          this.saveData();
        } else {
        }
      });
    },
    saveData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        nome: this.nome,
        tipo: this.tipo,
        endereco: this.endereco,
        email: this.email,
        nuit: this.nuit,
        contacto: this.contacto,
      };
      http
        .post("/clientes", data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.getData();
          this.$bvModal.hide("add");
          (nome = ""),
            (tipo = ""),
            (contacto = ""),
            (email = ""),
            (nuit = ""),
            (endereco = "");
        })
        .catch((error) => {});
    },

    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/clientes", config)
        .then((result) => {
          this.clientes = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
