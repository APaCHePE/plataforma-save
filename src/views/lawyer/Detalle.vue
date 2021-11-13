<template>
    <section class="content">
    <template>
        <el-row :gutter="10">
            <el-col :md="8"><h1>Detalle de tu Horario</h1></el-col>
            <el-col :md="8"><el-button type="primary" @click="getNuevoHorario()">Actualizar</el-button></el-col>
            <el-col :md="8"><el-button type="primary" @click="grabarmodal(1)">Nuevo</el-button></el-col>
        </el-row><br>
        <el-row :gutter="10">
            <el-table
                v-if="listNuevoHorario"
                :data="listNuevoHorario"
                border
                style="width: 100%">
                <el-table-column
                prop="dia"
                label="Dia"
                width="100">
                </el-table-column>
                <el-table-column
                prop="hora_inicio"
                label="Hora de Inicio"
                width="135">
                </el-table-column>
                <el-table-column
                prop="hora_final"
                label="Hora de Fin"
                width="135">
                </el-table-column>
                <el-table-column
                prop="periodo_refrigerio"
                label="Refrigerio"
                width="150">
                </el-table-column>
                <el-table-column
                prop="tiempo_atencion"
                label="Atencion"
                width="120">
                </el-table-column>
                <el-table-column
                prop="id_001_estado"
                label="Operaciones">
                    <template slot-scope="scope">
                        <el-row :gutter="10">
                            <el-col :md="8">
                                <el-button size="mini" type="warning" @click="cambiarAction(scope.row.id_nuevo_horario)">
                                    Modificar</el-button>
                            </el-col>
                            <el-col :md="8">
                                <el-button size="mini" type="warning" @click="eliminarAction(scope.row.id_nuevo_horario)">
                                    Eliminar</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <availability v-if="showModalPost" @grabarmodal="grabarmodal" :valOperacion="valOperacion"/>
        <message-action v-if="showModalAction" @activarmodal="activarmodal" :valOperacion="valOperacion"/>
    </template>
    </section>
</template>

<script>
  import Availability from './Availability';
  import MessageAction from './MessageAction.vue';

  export default {
    components:{
        Availability,
        MessageAction
    },
    props:['userlogin'],
    created(){
        this.valOperacion.userlogin = this.userlogin;
        this.getNuevoHorario()
        // this.getAsesoria()
    },
    data() {
      return {
        showModalPost: false,
        showModalAction: false,
        valOperacion:{
            crear:{
                listNH: []
            },
            id_tipo_action: null,
            id_valHorarioNuevo: null,
            userlogin: null
        },
        listNuevoHorario: null,
        //se trae listAsesoria para traer otros datos especificos
        //listAsesoria: null
      }
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        eliminarAction(val){
            console.log(val)
            this.valOperacion.id_valHorarioNuevo = val
            this.activarmodal(3)
        },
        cambiarAction(val){
            console.log(val)
            this.valOperacion.id_valHorarioNuevo = val
            this.grabarmodal(2)
        },
        grabarmodal(val){
            if(this.showModalPost == false){
                this.showModalPost = true
            }
            else{
                this.showModalPost = false
            }
            this.valOperacion.id_tipo_action = val
            if(val==1){
                this.valOperacion.id_valHorarioNuevo = 7
            }if(val==null){
                this.getNuevoHorario()
            }         
        },
        activarmodal(val){
            if(this.showModalAction == false){
                this.showModalAction = true
            }
            else{
                this.showModalAction = false
            }if(val==null){
                this.getNuevoHorario()
            }   
            this.valOperacion.id_tipo_action = val
        },
        getNuevoHorario() {
            const endpoint = '/getNuevoHorario/00/00/'+this.userlogin.id_usuario+'/0'
            this.$http.get(endpoint).then((response) => {
                let data = response.data.resultado;
                let array = [];
                if(data!=null){
                data.forEach(item => {
                    if(item.id_001_estado == 1){
                    array.push(item)
                    }
                });
                }
                this.listNuevoHorario = array;
            })
            .catch((e) => {
                console.log(e);
            });
        },
    }
  }
</script>

<style>

</style>