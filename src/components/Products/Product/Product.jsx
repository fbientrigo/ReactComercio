import React from 'react';
import { Card, CardMedia, CardHeader, CardContent, CardActions, Typography, IconButton,CardActionArea } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
    <CardActionArea>
    <CardHeader
        title={product.name}
    />
      <CardMedia 
        style = {{
            width: "auto",
            maxHeight: "200px",
        }}
        className={classes.media} image={product.image.url} title={product.name} />

      <CardContent>
        <div className={classes.cardContent}>
          {/* <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography> */}
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price.formatted}
          </Typography>
        </div>
        {/* <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" /> */}
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
        </IconButton>
            <IconButton aria-label="Share">
        <ShareIcon />
        </IconButton>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>

      </CardActions>

        </CardActionArea>
    </Card>
  );
};

export default Product;

