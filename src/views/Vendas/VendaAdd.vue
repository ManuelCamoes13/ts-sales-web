<template>
  <div>
    <b-row>
      <b-col lg="10">
        <h1 class="page-title">Nova <span class="fw-semi-bold">Venda</span></h1>
      </b-col>
      <b-col lg="2">
        <b-button variant="success" size="lg" class="" @click="verificar"
          >Efectuar venda</b-button
        >
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="12" xs="12">
        <Widget title="Informacao do cliente">
          <b-row>
            <b-col lg="10">
              <b-form-group
                horizontal
                label="Seleccione o cliente"
                label-for="search-select"
              >
                <v-select
                  id="search-select"
                  v-model="selectedCliente"
                  :options="clientes"
                  label="nome"
                  :reduce="(cliente) => cliente.id"
                  class=""
                />
              </b-form-group>
            </b-col>
            <b-col lg="2">
              <b-button variant="success" size="md" class="mt-4" v-b-modal.add
                >Adicionar</b-button
              >
            </b-col>

            <b-col sm="3" class="b-col-print-6">
              <h5 class="text-muted no-margin">Informações do cliente</h5>
              <strong>Nome: </strong><br />
              <strong>Telefone: </strong><br />
              <strong>Email: </strong><br />
              <strong>NUIT: </strong><br />
            </b-col>
            <b-col sm="4" class="b-col-print-6">
              <br />
              {{ selectedCliente.nome }}<br />
              {{ selectedCliente.contacto }}<br />
              {{ selectedCliente.email }}<br />
              {{ selectedCliente.nuit }}<br />
            </b-col>
          </b-row>
        </Widget>
      </b-col>

      <b-col lg="8">
        <Widget title="Produtos e Mãos-de-obra selecionados" collapse>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nome do item</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produto, index) in produtosSelecionados" :key="index">
                <td>{{ produto.nome }}</td>
                <td>{{ produto.preco }}.MT</td>
                <td>
                  <div class="number-counter" id="number-counter">
                    <b-button
                      variant="success"
                      size="xs"
                      @click="decreaseQuantity(produto)"
                      >-</b-button>
                    <input
                      v-model.number="produto.quantidade"
                      type="number"
                      id="quantity-1"
                      value="1"
                      min="0.1"
                      max="20"
                    />
                    <b-button
                      variant="success"
                      size="xs"
                      @click="increaseQuantity(produto)"
                      >+</b-button>
                  </div>
                </td>
                <td>
                  <b-badge variant="primary">
                    {{ produto.preco * produto.quantidade }}.MT
                  </b-badge>
                </td>
              </tr>

              <tr v-for="mao in maoDeObraSelecionadasDetalhes" :key="mao.id">
                <td>{{ mao.nome }}</td>
                <td>{{ mao.preco }}.MT</td>
                <td>
                  <div class="number-counter">
                    <b-button
                      variant="success"
                      size="xs"
                      @click="decreaseQuantityMao(mao)"
                      >-</b-button
                    >
                    <input
                      v-model.number="mao.quantidade"
                      type="number"
                      min="1"
                      max="10"
                    />
                    <b-button
                      variant="success"
                      size="xs"
                      @click="increaseQuantityMao(mao)"
                      >+</b-button
                    >
                  </div>
                </td>
                <td>
                  <b-badge variant="success">
                    {{ mao.preco * mao.quantidade }}.MT
                  </b-badge>
                </td>
              </tr>
            </tbody>
          </table>
        </Widget>
      </b-col>
      <b-col lg="4">
        <Widget title="Resumo" collapse>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Produtos</td>
                <td>{{ totalProdutos }} .MT</td>
              </tr>
              <tr>
                <td>Mão-de-obra</td>
                <td>{{ totalMaoDeObra }} .MT</td>
              </tr>
              <tr>
                <td>Desconto 10%</td>
                <td>
                  <input
                    v-model="desconto"
                    type="number"
                    value="1"
                    min="1"
                    max="9999999"
                  />
                  <!-- {{totalProdutos + totalMaoDeObra /10}} -->
                  <!-- .MT <input type="checkbox" id="checkbox-warning" :checked="true" /> -->
                </td>
              </tr>
              <tr>
                <td>IVA (16%)</td>
                <td>{{ imposto.toFixed(2) }} .MT</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <b-badge variant="success"> {{ totalGeral.toFixed(2) }} .MT </b-badge>
                </td>
              </tr>
            </tbody>
          </table>
        </Widget>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="8" xs="12">
        <Widget title="Produtos" collapse>
          <b-form-group horizontal label="Filtar por categoria" label-for="search-select">
            <v-select
              id="search-select"
              v-model="categoriaId"
              :options="categorias"
              label="nome"
              :reduce="(categoria) => categoria.id"
              class=""
            />
          </b-form-group>
          <b-row>
            <!-- Primeira coluna de produtos -->
            <b-col lg="6" v-for="(produto, index) in produtos" :key="index">
              <b-form-group class="abc-checkbox abc-checkbox-primary">
                <input
                  type="checkbox"
                  :id="'produtoCheckbox' + index"
                  :value="produto.id"
                  @change="toggleProdutoSelecionado(produto)"
                  :checked="isProdutoSelecionado(produto.id)"
                />
                <label :for="'produtoCheckbox' + index">
                  {{ produto.nome }} -
                  <strong>
                    {{
                      produto.categoria.unidade === "pcs"
                        ? Math.trunc(produto.quantidade)
                        : produto.quantidade
                    }}{{
                      produto.categoria.unidade === "metros"
                        ? "metros"
                        : produto.categoria.unidade
                    }}
                  </strong>
                </label>
              </b-form-group>
            </b-col>
          </b-row>
        </Widget>
      </b-col>
      <b-col lg="4" xs="12">
        <Widget title="Mãos-de-obra" collapse>
          <b-form-group horizontal label="Filtar por categoria" label-for="search-select">
            <v-select
              id="search-select"
              v-model="selectedCategoriaMaoDeObra"
              :options="categoriasMaoDeObra"
              label="nome"
              :reduce="(categ) => categ.id"
              class=""
            />
          </b-form-group>
          <b-row>
            <b-col lg="12" v-for="(maoDeObra, index) in maosDeObra" :key="index">
              <b-form-group class="abc-checkbox abc-checkbox-success">
                <input
                  type="checkbox"
                  :id="'maoDeObraCheckbox' + index"
                  :value="maoDeObra"
                  @change="toggleMaoDeObraSelecionada(maoDeObra)"
                />
                <label :for="'maoDeObraCheckbox' + index">
                  {{ maoDeObra.nome }} - {{ maoDeObra.preco }} .MT
                </label>
              </b-form-group>
            </b-col>
          </b-row>
        </Widget>
      </b-col>
    </b-row>

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
        <b-form-group <b-form-group label="NUIT" label-breakpoint="md" label-for="basic">
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
            @click="saveCliente"
          >
            Salvar
          </b-button>
          <b-button type="button" variant="default" class="btn-rounded">
            Cancelar
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import vSelect from "vue-select";
import http from "../../../http-common.js";
export default {
  components: {
    vSelect,
  },

  data() {
    return {
      selectedCliente: "",
      tipo: "singular",
      nome: "",
      nuit: "",
      contacto: "",
      email: "",
      endereco: "", // Certifique-se de usar o nome correto
      error: "",
      produtoId: "",
      selectedCliente: "",
      maoDeObraId: "",
      clientes: [],
      produtos: [],
      maosDeObra: [],
      maoDeObraSelecionados: [],
      produtosSelecionados: [],
      categorias: [],
      desconto: 0,
      imposto: 0,
      categoriasMaoDeObra: [],
      selectedCategoriaMaoDeObra: [],

      clienteIdPadrao: 1,

      nome: "",
      tipo: "",
      contacto: "",
      email: "",
      nuit: "",
      endereco: "",
    };
  },

  computed: {
    clienteSelecionado() {
      // Retorna o cliente que corresponde ao clienteId selecionado
      return this.clientes.find((cliente) => cliente.id === this.clienteId);
    },
  },

  mounted() {
    this.getClientes();
    this.getCategorias();
    this.getProdutos();
    this.getMaoDeObra();
    this.getCategoriaMaoDeObra();
  },

  computed: {
    totalProdutos() {
      // Calcula o total dos produtos selecionados multiplicando pelo preço e quantidade
      return this.produtosSelecionados.reduce(
        (total, produto) => total + produto.preco * produto.quantidade,
        0
      );
    },
    totalMaoDeObra() {
      return this.maoDeObraSelecionados.reduce(
        (total, maoDeObra) => total + maoDeObra.preco * maoDeObra.quantidade,
        0
      );
    },

    iva() {
      // Calcula 16% de IVA sobre o total de produtos + mão de obra
      this.imposto = (this.totalProdutos + this.totalMaoDeObra - this.desconto) * 0.16;
      return this.imposto;
    },
    totalGeral() {
      // Calcula o total geral (produtos + mão de obra + IVA)
      return this.totalProdutos + this.totalMaoDeObra + this.iva;
    },

    clienteSelecionado() {
      // Retorna o cliente que corresponde ao clienteId selecionado
      return this.clientes.find((cliente) => cliente.id === this.clienteId);
    },
    maoDeObraSelecionadasDetalhes() {
      return this.maoDeObraSelecionados.map((mao) => ({
        id: mao.id,
        preco: mao.preco,
        nome: mao.nome,
        quantidade: mao.quantidade,
      }));
    },
  },
  methods: {
    saveCliente() {
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
          this.getClientes();
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

    /////////////////////////////////

    // Verifica se o produto já foi selecionado
    isProdutoSelecionado(produtoId) {
      return this.produtosSelecionados.some((produto) => produto.id === produtoId);
    },

    // Adiciona ou remove o produto selecionado da lista
    toggleProdutoSelecionado(produto) {
      const produtoIndex = this.produtosSelecionados.findIndex(
        (p) => p.id === produto.id
      );

      if (produtoIndex === -1) {
        this.produtosSelecionados.push({ ...produto, quantidade: 1 });
      } else {
        this.produtosSelecionados.splice(produtoIndex, 1);
      }
    },

    toggleMaoDeObraSelecionada(maoDeObra) {
      const index = this.maoDeObraSelecionados.findIndex(
        (item) => item.id === maoDeObra.id
      );

      if (index === -1) {
        // Inicializa com quantidade
        this.maoDeObraSelecionados.push({ ...maoDeObra, quantidade: 1 });
      } else {
        this.maoDeObraSelecionados.splice(index, 1);
      }
    },

    // Aumentar quantidade
    increaseQuantity(produto) {
      const produtoIndex = this.produtosSelecionados.findIndex(
        (p) => p.id === produto.id
      );
      if (
        produtoIndex !== -1 &&
        this.produtosSelecionados[produtoIndex].quantidade < 10
      ) {
        this.produtosSelecionados[produtoIndex].quantidade++;
      }
    },

    // Diminuir quantidade
    decreaseQuantity(produto) {
      const produtoIndex = this.produtosSelecionados.findIndex(
        (p) => p.id === produto.id
      );
      if (produtoIndex !== -1 && this.produtosSelecionados[produtoIndex].quantidade > 1) {
        this.produtosSelecionados[produtoIndex].quantidade--;
      }
    },

    increaseQuantityMao(mao) {
      const index = this.maoDeObraSelecionados.findIndex((m) => m.id === mao.id);
      if (index !== -1 && this.maoDeObraSelecionados[index].quantidade < 10) {
        this.maoDeObraSelecionados[index].quantidade++;
      }
    },

    decreaseQuantityMao(mao) {
      const index = this.maoDeObraSelecionados.findIndex((m) => m.id === mao.id);
      if (index !== -1 && this.maoDeObraSelecionados[index].quantidade > 1) {
        this.maoDeObraSelecionados[index].quantidade--;
      }
    },

    verificar() {
      if (this.imposto == 0) {
        this.$swal({
          title: "Erro!",
          text: "Efectue uma venda valida",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        this.enviarDados();
      }
    },
    async enviarDados() {
      const data = {
        user_id: 1,
        cliente_id: this.selectedCliente?.id || this.clienteIdPadrao,
        imposto: parseFloat(this.imposto.toFixed(2)),
        desconto: parseFloat(this.desconto),
        produtos: this.produtosSelecionados.map((produto) => ({
          produto_id: produto.id,
          nome: produto.nome,
          quantidade: parseFloat(produto.quantidade),
          preco_unitario: parseFloat(produto.preco),
        })),
        // mao_de_obra_id: this.maoDeObraSelecionados // apenas os IDs da mão-de-obra
        mao_de_obras: this.maoDeObraSelecionados.map((mao) => ({
          mao_de_obra_id: mao.id,
          nome: mao.nome,
          preco: parseFloat(mao.preco),
          quantidade: parseInt(mao.quantidade),
        })),
      };

      try {
        const response = await http.post("/venda", data);
        this.$swal({
          title: "Sucesso!",
          text: "Operação realizada com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
        });
        this.$router.push({ name: "venda-factura" });
      } catch (error) {
        let mensagemErro = "Erro ao efectuar operação";

  // Verifica se o erro possui uma resposta do backend
  if (error.response && error.response.data && error.response.data.message) {
    mensagemErro = error.response.data.message; // Exibe a mensagem específica do backend
  }

        this.$swal({
          title: "Erro!",
          text: mensagemErro,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log(error)
      }
    },

    getClientes() {
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

    getProdutos() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/produtos", config)
        .then((result) => {
          this.produtos = result.data;
        })
        .catch((error) => {});
    },
    getCategoriaMaoDeObra() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/categorias_mao_de_obra", config)
        .then((result) => {
          this.categoriasMaoDeObra = result.data;
        })
        .catch((error) => {});
    },

    getMaoDeObra() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

      http
        .get("/mao_de_obra", config)
        .then((result) => {
          this.maosDeObra = result.data;
        })
        .catch((error) => {});
    },
  },
};
</script>
