import useStyles from "./Styles"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ImageGallery = ({images, onThumbnailSelected}) => {

    const styles = useStyles()

    const selectImage = (event, imgId) => {
        
        onThumbnailSelected(imgId)
    }

    return (
                <ImageList sx={{ width: 100, height: 450 }} cols={1} rowHeight={100}>
                    {images.map((tb) => (
                        <ImageListItem className={styles.imageListItem} key={tb.id}>
                            <img
                                src={`${tb.thumbUrl}?w=100&h=100&fit=crop&auto=format`}
                                srcSet={`${tb.thumbUrl}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                                alt={tb.title}
                                loading="lazy"
                                onClick={(e) => {
                                    selectImage(e, tb.id);
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
    )
}

export default ImageGallery