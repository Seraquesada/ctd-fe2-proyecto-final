
import TarjetaNoticias from './TarjetasNoticias'
import { ListaNoticias } from './styled'
import { INoticiasNormalizadas } from './types'


interface IProps{
    noticias:INoticiasNormalizadas[]
}

const ListadoNoticias = ({noticias}:IProps) => {
    return(
        <ListaNoticias>
        {noticias.map((noticia) => (
            <TarjetaNoticias key={noticia.id} noticia={noticia} />
        ))}
        </ListaNoticias>
    )
}

export default ListadoNoticias;