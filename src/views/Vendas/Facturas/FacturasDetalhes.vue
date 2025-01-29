<template>
  <b-row>
    <b-col lg="11">
    <!-- {{maoDeObras}} -->
      <b-row class="invoice-page">
        <b-col xs="12">
          <Widget>
         
            <header>
              <b-row>
                <b-col md="6" xs="12" class="b-col-print-6">
                  <img src="../../../assets/careca.jpg" alt="Logo" class="invoiceLogo" />
                </b-col>
                <b-col md="6" xs="12" class="b-col-print-6">
                  <h4 class="text-right">
                    #<span class="fw-semi-bold">
                      {{ factura.venda.factura.codigoFactura }}</span
                    >
                    /
                    <small>{{ factura.venda.factura.data }}</small>
                  </h4>
                  <div class="text-muted fs-larger text-right">
                    <strong>Estado: </strong>
                    <span>
                      <b-badge
                        :variant="
                          factura.venda.factura.estado === 'pendente'
                            ? 'warning'
                            : 'success'
                        "
                      >
                        {{ factura.venda.factura.estado }}
                      </b-badge>
                    </span>
                  </div>
                </b-col>
              </b-row>
            </header>
            <section class="invoiceBody">
              <b-row class="mb-lg">
                <b-col sm="6" class="b-col-print-6">
                  <h5 class="text-muted no-margin">Informações da Empresa</h5>
                  <h3 class="company-name m-t-1">Careca Tubos</h3>
                  <address>
                    <strong>Av. Mocambique, Maputo</strong><br />
                    Bairro Nsalene<br />
                    <strong>NUIT: </strong>1234456789<br />
                    <abbr title="Work Fax">Telefone: </abbr> +258 84 00 00 000 <br />
                    <abbr title="Work email">e-mail: </abbr>
                    <a href="mailto:#">carecatubos@gmail.com</a><br />
                  </address>
                  <h6 class="fw-semi-bold no-margin">Formas de pagamento</h6>
                  <strong>BCI: </strong>0000000009126718275<br />
                  <strong>MBIM: </strong>000000000332319887<br />
                  <strong>Mpesa: </strong>84 00 00 000<br />
                </b-col>

                <b-col sm="6" class="b-col-print-6 text-right">
                  <h5 class="text-muted no-margin">Informações do Cliente</h5>
                  <h3 class="client-name m-t-1">{{ factura.venda.cliente.nome }}</h3>
                  <address>
                    <strong>{{ factura.venda.cliente.endereco }}</strong> <br />
                    {{ factura.venda.cliente.endereco }}
                    <p class="no-margin">
                      <strong>NUIT: </strong>{{ factura.venda.cliente.nuit }}
                    </p>
                    <abbr title="Work email">e-mail:</abbr>
                    <a href="mailto:#">{{ factura.venda.cliente.email }}</a
                    ><br />
                    <abbr title="Work Phone">Telefone:</abbr>+258
                    {{ factura.venda.cliente.contacto }}<br />
                  </address>
                </b-col>
              </b-row>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th class="hidden-sm-down d-print-none">Descrição</th>
                    <th>Quantidade</th>
                    <th class="hidden-sm-down d-print-none">Preço unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(produto, index) in produtos" :key="index">
                      <td>{{ index + 1 }}</td>
                    <td>{{produto.nome}}</td>
                    <td class="hidden-sm-down d-print-none">
                     {{produto.descricao}}
                    </td>
                    <td>{{produto.venda_produtos.quantidade}} {{produto.unidade}}</td>
                    <td class="hidden-sm-down d-print-none">{{produto.preco}}</td>
                    <td>{{produto.preco * produto.venda_produtos.quantidade}}</td>
                  </tr>

                 
                </tbody>
              </table>

 <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mao de obra</th>
                    <th class="hidden-sm-down d-print-none">Categoria</th>
                    <th>Quantidade</th>
                    <th class="hidden-sm-down d-print-none">Preço unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                
                  <tr v-for="(maoDeObra, index) in maoDeObras" :key="index">
                <td>  {{ index + 1 }}</td>
                    <td>{{maoDeObra.nome}}</td>
                    <td class="hidden-sm-down d-print-none">
                    {{maoDeObra.categoria_id}}
                    </td>
                    <td>{{maoDeObra.venda_mao_de_obras.quantidade}}</td>
                    <td class="hidden-sm-down d-print-none">{{maoDeObra.venda_mao_de_obras.preco}}</td>
                    <td>{{maoDeObra.venda_mao_de_obras.preco * maoDeObra.venda_mao_de_obras.quantidade}}</td>
                  </tr>
                 
                </tbody>
              </table>
             <b-row>
  <b-col xs="12" md="8" class="b-col-print-6">
    <p>
      <strong>Note:</strong>
      Alguma nota na factura
    </p>
  </b-col>
  <b-col md="4" xs="12" class="b-col-print-6">
    <b-row class="text-right justify-content-end">
      <b-col xs="6"></b-col>
      <b-col sm="3">
        <p>Subtotal</p>
        <p>IVA(16%)</p>
        <p>Desconto</p>
        <p class="no-margin"><strong>Total</strong></p>
      </b-col>
      <b-col sm="3">
        <p>{{ subtotal }}</p>
        <p>{{ iva }}</p>
        <p>0</p>
        <p class="no-margin"><strong>{{ total }}</strong></p>
      </b-col>
    </b-row>
  </b-col>
</b-row>
              <!-- <p class="text-right mt-lg mb-xs">Marketing Consultant</p>
              <p class="text-right">
                <span class="fw-semi-bold">Bob Smith</span>
              </p> -->
              <b-button-toolbar class="mt-lg justify-content-end d-print-none">
                <b-button onClick="{this.printInvoice}" variant="inverse" class="mr-2">
                  <i class="fa fa-print" />
                  &nbsp;&nbsp; Imprimir
                </b-button>
                <b-button v-if=" factura.venda.factura.estado == 'pendente'" variant="success" v-b-modal.add>
                  Efectuar pagamento &nbsp;
                  <span class="circle bg-white">
                    <i class="fa fa-arrow-right text-success" />
                  </span>
                </b-button>
              </b-button-toolbar>
            </section>
          </Widget>
        </b-col>
      </b-row>
    </b-col>
  <b-modal
    id="add"
    title="Efectuar pagamento"
    body-class="bg-white"
    cancel-variant="default"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <label>Forma de pagamento</label>
      
      <b-form-group class="radio abc-radio">
        <input 
          type="radio" 
          name="radio1" 
          id="radio-small" 
          v-model="formaPagamento" 
          value="numerario" 
        />
        <label for="radio-small">Numerario</label>
      </b-form-group>

      <b-form-group class="radio abc-radio">
        <input 
          type="radio" 
          name="radio1" 
          id="radio-big" 
          v-model="formaPagamento" 
          value="cheque" 
        />
        <label for="radio-big">Cheque</label>
      </b-form-group>

      <!-- Campo número do cheque aparece apenas se a opção "cheque" for selecionada -->
      <b-form-group
        v-if="formaPagamento === 'cheque'"
        label="Numero do cheque"
        label-for="search-field"
        breakpoint="md"
      >
        <input
          v-validate="'required'"
          name="simple"
          :class="{ 'form-control': true, 'is-invalid': errors.has('simple') }"
          type="number"
          id="basic"
          v-model="numeroCheque"
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
  </b-row>
</template>

<script>
import http from "../../../../http-common.js";
import vSelect from "vue-select";
export default {
  components: { vSelect },
  data() {
    return {
      nome: "",
      unidade: "pcs",

      factura: [],
      produtos:[],
      maoDeObras:[],
      formaPagamento:'numerario'
    };
  },

  computed: {
  // Subtotal que agora inclui produtos e mãos de obra
  subtotal() {
    // Soma o valor dos produtos com o valor das mãos de obra
    const produtosTotal = this.produtos.reduce(
      (acc, produto) => acc + produto.preco * produto.venda_produtos.quantidade,
      0
    );

    const maoDeObrasTotal = this.maoDeObras.reduce(
      (acc, maoDeObra) => acc + maoDeObra.venda_mao_de_obras.preco * maoDeObra.venda_mao_de_obras.quantidade,
      0
    );

    return produtosTotal + maoDeObrasTotal;
  },

  // Calcula 16% do subtotal
  iva() {
    return this.subtotal * 0.16;
  },

  // Soma subtotal + IVA
  total() {
    return this.subtotal + this.iva;
  }
}
,

  mounted() {
    this.getData();
  },
  methods: {
    saveData() {
      this.$validator.validateAll();
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        facturas: [this.factura.venda.factura.id],
        formaPagamento: this.formaPagamento,
        numeroCheque:this.numeroCheque,
        estado:"pago"
      };
      http
        .post("/recibos", data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.$bvModal.hide("add");
          this.nome = "";
          this.unidade = "";
          this.getData();
        })
        .catch((error) => {
          this.$swal({
            title: "Erro!",
            text: error.response.data.error,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
 updateFactura() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const data = {
        estado: "pago",
        
      };
      http
        .put(`/venda/${facturaId}`, data, config)
        .then((result) => {
          this.$swal({
            title: "Sucesso!",
            text: "Operação realizada com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          // this.$bvModal.hide('add');
          // this.nome = "";
          // this.unidade = "";
          this.getData();
        })
        .catch((error) => {
          this.$swal({
            title: "Erro!",
            text: error.response.data.error,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },


    getData() {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };

       const facturaId = this.$route.params.facturaId;


      http
       .get(`/venda/${facturaId}`, config)
        .then((result) => {
          this.factura = result.data;
          this.produtos = result.data.venda.produtos;
          this.maoDeObras = result.data.venda.mao_de_obras;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style src="./Invoice.scss" lang="scss" scoped />
