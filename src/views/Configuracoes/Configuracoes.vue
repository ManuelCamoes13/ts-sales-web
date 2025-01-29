<template>
  <div>
    <h1 class="page-title">Configuracoes - <span class="fw-semi-bold">da empresa</span>
    </h1>

    <b-row>
      <b-col lg='12' xs='12'>
        <Widget
          
        >
          <b-form @submit="onSubmit">
            
              <b-form-group
                horizontal
                label="Nome da empresa"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="simple"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('simple')}"
                  type="text"
                  id="basic"
                />
                <span class="text-danger" v-if="errors.has('simple')">
                  {{ errors.first('simple') }}
                </span>
              </b-form-group>
              
                <span class="text-danger" v-if="errors.has('minlength')">
                  {{ errors.first('minlength') }}
                </span>
              </b-form-group>
            
                <b-form-group
                horizontal
                label="NUIT"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="simple"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('nuit')}"
                  type="number"
                  id="nuit"
                />
                <span class="text-danger" v-if="errors.has('nuit')">
                  {{ errors.first('nuit') }}
                </span>
              </b-form-group>
              
                
           
            
              <b-form-group
                horizontal
                label="E-mail"
                :label-cols="3"
                label-breakpoint="md"
                label-for="email"
              >
                <input
                  v-validate="'required|email'"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('email')}"
                  type="text"
                  id="email"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Number"
                :label-cols="3"
                label-breakpoint="md"
                label-for="number"
              >
                <input
                  v-validate="'required|numeric'"
                  name="number"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('number')}"
                  type="text"
                  id="number"
                />
                <span class="text-danger" v-if="errors.has('number')">
                  {{ errors.first('number') }}
                </span>
              </b-form-group>
              <b-form-group
                horizontal
                label="Telefone 1"
                :label-cols="3"
                label-breakpoint="md"
                label-for="range"
              >
                <input
                  v-validate="'required|numeric'"
                  name="range"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('telefone1')}"
                  type="number"
                  id="telefone1"
                />
                <span class="text-danger" v-if="errors.has('telefone1')">
                  {{ errors.first('telefone1') }}
                </span>
              </b-form-group>
               <b-form-group
                horizontal
                label="Telefone 2"
                :label-cols="3"
                label-breakpoint="md"
                label-for="range"
              >
                <input
                  v-validate="'required|numeric'"
                  name="range"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('telefone2')}"
                  type="number"
                  id="telefone2"
                />
                <span class="text-danger" v-if="errors.has('telefone2')">
                  {{ errors.first('telefone2') }}
                </span>
              </b-form-group>
               <b-form-group
                horizontal
                label="Endereco"
                :label-cols="3"
                label-breakpoint="md"
                label-for="basic"
              >
                <input
                  v-validate="'required'"
                  name="Endereco"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('Endereco')}"
                  type="text"
                  id="Endereco"
                />
                <span class="text-danger" v-if="errors.has('Endereco')">
                  {{ errors.first('Endereco') }}
                </span>
              </b-form-group>
              <legend>
                Informacoes de pagamento
              </legend>
              <b-form-group
                horizontal
                label="BCI"
                :label-cols="3"
                label-breakpoint="md"
                label-for="bci"
              >
                <input
                  v-validate="'required'"
                  name="bci"
                  :class="{ 'form-control': true, 'is-invalid': errors.has('bci')}"
                  type="bci"
                  id="bci"
                  ref="bci"
                />
                <span class="text-danger" v-if="errors.has('bci')">
                  {{ errors.first('bci') }}
                </span>
              </b-form-group>
              
             

            </fieldset>
            <div class="form-action bg-transparent px-0">
              <b-button type="submit" variant="success" class="btn-rounded float-right">
                Validate & Submit
              </b-button>
              <b-button type="button" variant="default" class="btn-rounded">
                Cancel
              </b-button>
            </div>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'FormValidation',
  components: { Widget },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$validator.validateAll();
    },
  },
};
</script>
