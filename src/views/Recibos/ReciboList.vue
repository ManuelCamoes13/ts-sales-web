<template>
  <b-row>
  <h1 class="page-title"><span class="fw-semi-bold">Recibos</span></h1>
    <b-col lg="12">
      <Widget customHeader>
        <!-- <b-button class="mr-sm" variant="primary" v-b-modal.demo>Demo</b-button> -->

        <b-row class="mt-md mb-md">
          <b-col lg="3">
              <b-button variant="success" to="/app/venda/recibo/add">
                Criar recibo &nbsp;
                <span class="circle bg-white">
                  <i class="fa fa-plus text-success" />
                </span>
              </b-button>
          </b-col>
          <!-- <b-col lg="3">
             <b-form-group
              horizontal
              label="Filtrar"
              label-for="search-select"
              :label-cols="4"
            >
              <v-select
                id="search-select"
                v-model="selectedCategoria"
                :options="categorias"
                label="nome"
                :reduce="(categoria) => categoria.id"
              />
            </b-form-group>
          </b-col> -->
        </b-row>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Data de emissao</th>
              <th>Tipo de pagamento</th>
              <th>Numero de cheque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(recibo, index) in recibos" :key="index">
              <td>{{ recibo.codigo }}</td>
              <td>{{ formatarData(recibo.createdAt) }}</td>
              <td>{{ recibo.formaPagamento }}</td>
              <td>
  <span v-if="recibo.formaPagamento == 'numerario'">---</span>
  <span v-else>{{ recibo.numeroCheque }}</span>
</td>
              <td>
                <b-button-group class="mb-3">
               <b-button
                    size="xs"
                    variant="primary"
                    :to="{
                      name: 'recibo-detalhes',
                      params: { reciboId: recibo.id},
                    }"
                  >
                    <i class="fa fa-eye mr-0 mb-xs" />
                    Ver</b-button
                  >
                  
                  
                </b-button-group>
              </td>
            </tr>
          </tbody>
        </table>
      </Widget>

      <b-modal
        id="add"
        title="Nova categoria"
        body-class="bg-white"
        cancel-variant="default"
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            label="Nome da categoria"
            label-for="search-field"
            breakpoint="md"
          >
            <input
              v-validate="'required'"
              name="simple"
              :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
              type="text"
              id="basic"
              v-modal="nome"
            />
            <span class="text-danger" v-if="errors.has('simple')">
              {{ errors.first("simple") }}
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
        title="Editar categoria"
        body-class="bg-white"
        cancel-variant="default"
      >
        <b-form @submit.prevent="handleSubmit">
          <b-form-group
            label="Nome da categoria"
            label-for="search-field"
            breakpoint="md"
          >
            <input
              v-validate="'required'"
              name="simple"
              :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
              type="text"
              id="basic"
            />
            <span class="text-danger" v-if="errors.has('simple')">
              {{ errors.first("simple") }}
            </span>
          </b-form-group>

          <div class="form-action bg-transparent px-0">
            <b-button
              type="submit"
              variant="success"
              class="btn-rounded float-right"
              @click="saveData"
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
      produtos: [],
      recibos:[],
    };
  },

  mounted() {
    this.getData();
    this.getCategorias();
  },
  methods: {

    formatarData(data) {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(new Date(data));
    },


    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/recibos", config)
        .then((result) => {
          this.recibos = result.data.reverse();
        })
        .catch((error) => {});
    },
    getCategorias() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/categorias", config)
        .then((result) => {
          
          this.categorias = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
