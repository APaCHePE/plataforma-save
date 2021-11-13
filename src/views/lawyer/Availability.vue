<template>
  <div class="content-modal message">
    <div class="mask"></div>
    <div class="modal">
      <div class="content-wrapper">
        <h1 v-if="valOperacion.id_tipo_action == 1 || valOperacion.id_tipo_action == 5">Nuevo Horario</h1><br> 
        <h1 v-if="valOperacion.id_tipo_action == 2">Modificar</h1><br> 
        <section class="content">
          <template v-if="!showModalAction">

            <!-- ---------------------------para nuevo----------------------- -->
              <template v-if="this.valOperacion.id_tipo_action == 1 || valOperacion.id_tipo_action == 5">
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Hora de Inicio</label></el-col>
                  <el-col :md="8">
                    <el-time-select class="btn-block"
                      v-model="horario.hora_inicio"
                      :picker-options="{
                        start: '08:00',
                        step: '00:30',
                        end: '15:00'
                      }"
                      placeholder="Inicio de atención">
                    </el-time-select>
                  </el-col>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Hora de Fin</label></el-col>
                  <el-col :md="8">
                    <el-time-select
                      v-model="horario.hora_final"
                      :picker-options="{
                        start: '10:00',
                        step: '00:30',
                        end: '18:30'
                      }"
                      placeholder="Fin de atención">
                    </el-time-select>
                  </el-col>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Periodo de Refrigerio</label>
                    <el-switch v-model="boolRefrigerio"></el-switch>
                  </el-col>
                  <template v-if="boolRefrigerio">
                    <el-col :md="8">
                      <el-select v-model="inicioRefrigerio" placeholder="Inicio">
                        <el-option :value="'12:00:00'" label="12:00"></el-option>
                        <el-option :value="'12:30:00'" label="12:30"></el-option>
                        <el-option :value="'13:00:00'" label="13:00"></el-option>
                        <el-option :value="'13:30:00'" label="13:30"></el-option>
                        <el-option :value="'14:00:00'" label="14:00"></el-option>
                        <el-option :value="'14:30:00'" label="14:30"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="8">
                      <el-select v-model="finRefrigerio" placeholder="Fin">
                        <el-option :value="'12:30:00'" label="12:30"></el-option>
                        <el-option :value="'13:00:00'" label="13:00"></el-option>
                        <el-option :value="'13:30:00'" label="13:30"></el-option>
                        <el-option :value="'14:00:00'" label="14:00"></el-option>
                        <el-option :value="'14:30:00'" label="14:30"></el-option>
                        <el-option :value="'15:00:00'" label="15:00"></el-option>
                      </el-select>
                    </el-col>
                  </template>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Tiempo de Atención</label></el-col>
                  <el-col :md="8">
                    <el-input-number v-model="horario.tiempo_atencion" controls-position="right" @change="handleChange" :min="30" :max="120" step-strictly></el-input-number>
                  </el-col>
                </el-row>  
                <template v-if="valOperacion.id_tipo_action == 1  || valOperacion.id_tipo_action == 5"><br> 
                  <el-row :gutter="10">
                    <el-col :md="8"><label>Días de la Semana </label></el-col>
                    <el-col :md="16">
                      <el-row>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Marcar todos</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                      </el-row>
                    </el-col>
                  </el-row>
                </template>
              </template>
              
            <!-- -----------------------------para modificar---------------------- -->
              
              <template v-if="this.valOperacion.id_tipo_action == 2">
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Hora de Inicio</label></el-col>
                  <el-col :md="8">
                    <el-time-select class="btn-block"
                      v-model="modi_Horario.hora_inicio"
                      :picker-options="{
                        start: '08:00',
                        step: '00:30',
                        end: '15:00'
                      }"
                      placeholder="Inicio de atención">
                    </el-time-select>
                  </el-col>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Hora de Fin</label></el-col>
                  <el-col :md="8">
                    <el-time-select
                      v-model="modi_Horario.hora_final"
                      :picker-options="{
                        start: '10:00',
                        step: '00:30',
                        end: '18:30'
                      }"
                      placeholder="Fin de atención">
                    </el-time-select>
                  </el-col>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Periodo de Refrigerio</label>
                    <el-switch v-model="boolRefrigerio"></el-switch>
                  </el-col>
                  <template v-if="boolRefrigerio">
                    <el-col :md="8">
                      <el-select v-model="inicioRefrigerio" placeholder="Inicio">
                        <el-option :value="'12:00:00'" label="12:00"></el-option>
                        <el-option :value="'12:30:00'" label="12:30"></el-option>
                        <el-option :value="'13:00:00'" label="13:00"></el-option>
                        <el-option :value="'13:30:00'" label="13:30"></el-option>
                        <el-option :value="'14:00:00'" label="14:00"></el-option>
                        <el-option :value="'14:30:00'" label="14:30"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="8">
                      <el-select v-model="finRefrigerio" placeholder="Fin">
                        <el-option :value="'12:30:00'" label="12:30"></el-option>
                        <el-option :value="'13:00:00'" label="13:00"></el-option>
                        <el-option :value="'13:30:00'" label="13:30"></el-option>
                        <el-option :value="'14:00:00'" label="14:00"></el-option>
                        <el-option :value="'14:30:00'" label="14:30"></el-option>
                        <el-option :value="'15:00:00'" label="15:00"></el-option>
                      </el-select>
                    </el-col>
                  </template>
                </el-row>
                <el-row :gutter="10"><br> 
                  <el-col :md="8"><label>Tiempo de Atención</label></el-col>
                  <el-col :md="8">
                    <el-input-number v-model="modi_Horario.tiempo_atencion" controls-position="right" @change="handleChange" :min="30" :max="120" step-strictly></el-input-number>
                  </el-col>
                </el-row>  
                <template v-if="valOperacion.id_tipo_action == 1"><br> 
                  <el-row :gutter="10">
                    <el-col :md="8"><label>Días de la Semana </label></el-col>
                    <el-col :md="16">
                      <el-row>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Marcar todos</el-checkbox>
                      </el-row>
                      <el-row>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                      </el-row>
                    </el-col>
                  </el-row>
                </template>
              </template>
            
            <!-- -----------------------------boton de acciones---------------------- -->

              <br><br> 
              <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('grabarmodal',null)">Cerrar</el-button>
                <el-button type="primary" @click="activarmodal(1)" v-if="this.valOperacion.id_tipo_action == 1  || valOperacion.id_tipo_action == 5">Crear</el-button>
                <el-button type="primary" @click="activarmodal(2)" v-if="this.valOperacion.id_tipo_action == 2">Modificar</el-button>
              </span>
          </template>
          <message-action v-if="showModalAction" @activarmodal="activarmodal" :valOperacion="valOperacion"/>
        </section>
      </div>
    </div>
  </div>    
</template>
<script>
import MessageAction from './MessageAction.vue';
const cityOptions = ['Lunes', 'Martes', 'Miercoles', 'Jueves','Viernes','Sabado','Domingo'];
export default {
    components:{
      MessageAction
    },
    props:['valOperacion'],
    created(){
      if(this.valOperacion.id_tipo_action == 2){
        this.getEspecificoHorario()
      }
      
    },
    data() {
      return { 
          boolRefrigerio: false,
          inicioRefrigerio: '13:00:00',
          finRefrigerio: '14:00:00',
          horario: {
            dia: null,
            id_abogado: null,
            hora_inicio: null,
            hora_final: null,
            tiempo_atencion: 30,
            periodo_refrigerio: null
          },
          listNuevoHorario: null,
          modi_Horario: {
            id_nuevo_horario: null,
            hora_inicio: null,
            hora_final: null,
            tiempo_atencion: 30,
            periodo_refrigerio: null
          },
          checkAll: false,
          checkedCities: [],
          cities: cityOptions,
          isIndeterminate: true,
          showModalAction: false,

      }
    },
    methods: {
      activarmodal(val){
        if(this.showModalAction == false){
            this.showModalAction = true
        }
        else{
            this.showModalAction = false
        } 
        this.valOperacion.id_tipo_action = val
        if(val == 1){
          this.crearNuevoHorario()
        }if(val == 5) {
          this.valOperacion.crear.listNH = []
        }if(val == 2){
          this.ModificarNuevoHorario()
        }if(val == 4){
          this.$emit('grabarmodal',null)
        }
      },
      handleChange(value) {
        console.log(value);
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        console.log(this.checkedCities)
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        console.log(this.checkedCities)
      },
      getEspecificoHorario() {
        const endpoint = '/getNuevoHorario/'+this.valOperacion.id_valHorarioNuevo+'/00/'+this.valOperacion.userlogin.id_usuario+'/0'
        this.$http.get(endpoint).then((response) => {
          this.listNuevoHorario = response.data.resultado[0];

          this.modi_Horario.id_nuevo_horario = this.listNuevoHorario.id_nuevo_horario
          this.modi_Horario.hora_inicio = this.listNuevoHorario.hora_inicio
          this.modi_Horario.hora_final = this.listNuevoHorario.hora_final
          this.modi_Horario.tiempo_atencion = this.listNuevoHorario.tiempo_atencion
          this.modi_Horario.periodo_refrigerio = this.listNuevoHorario.periodo_refrigerio

          console.log(this.modi_Horario)
        }).catch((e) => {
            console.log(e);
        });
      },
      crearNuevoHorario(){ 

        var bandera = this.checkedCities.length;
        for(let i=0; i<bandera; i++){  
            console.log(this.checkedCities[i])
            this.valOperacion.crear.listNH.push({
              dia: this.checkedCities[i],
              id_abogado: this.valOperacion.id_valHorarioNuevo,
              hora_inicio: this.horario.hora_inicio,
              hora_final: this.horario.hora_final,
              tiempo_atencion: this.horario.tiempo_atencion,
              periodo_refrigerio: `${this.inicioRefrigerio} - ${this.finRefrigerio}`
            })
        }
        
      },

      ModificarNuevoHorario(){

        this.modi_Horario.periodo_refrigerio = `${this.inicioRefrigerio} - ${this.finRefrigerio}`
        this.valOperacion.id_valHorarioNuevo = this.modi_Horario
  
      },
    }
}
</script>

<style lang="scss" scoped>
  .el-date-editor{
    width: 100% !important
  }
  .el-input-number{
    width: 100% !important
  }
  .content-modal.message {
  .modal {
    border-radius: 30px;
    min-width: 280px;
    // max-width: 280px;
    margin: auto;
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 50px;
    background: white;
    .b-block button{
      width: 100%;
    }
    .element-two {
      display: flex;
      & >div:first-child {
        width: 30%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
      }
      & >div:last-child {
        width: 70%;
        max-width: 45%;
      }
      & > div {
        padding: 0 33px;
      }
      h1 {
        margin-bottom: 30px;
      }
    }
    .element-center {
      text-align: center;
    }
    .close {
      position: absolute;
      right: 10px;
      cursor: pointer;
      top: 10px;
    }
    .event-button {
      margin-bottom: 0;
      margin-top: 40px;
    }
    .description {
      padding-bottom: 30px;
      p {
      text-align: center;
      font-size: 30px;
      max-width: 415px;
      margin: auto;
      padding-top: 60px;
      padding-bottom: 40px;
      span {
        font-weight: bold;
      }
    }
    }
    .description2 {
      margin-top: 30px;
      font-size: 14px;
      line-height: 1.5;
    }
    .el-form-item__label {
      line-height: normal;
    }
  }
  .mask {
    background: #0000009e;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
@media only screen and (max-width: 600px) {
  .content-modal.message {
    .modal {
      top: 0;
      transform: none !important;
      left: 0;
      position: absolute;
      width: 100%;
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      .element-center {
        padding: 30px;
      }
    }
  }
}
</style>