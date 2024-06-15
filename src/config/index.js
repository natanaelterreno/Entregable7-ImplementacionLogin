import { connect } from "mongoose"

const connectDb = () => {    
    connect('mongodb+srv://natanaelterreno:Bizit.2024@clustercursonodecoderho.urgxwjd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ClusterCursoNodeCoderHouse')
    console.log('Base de Datos Conectada')
}

export default connectDb