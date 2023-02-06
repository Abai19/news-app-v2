import styles from "./Filter.module.css";
import { Button, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Filter({tags}) {

  return (
    <>
      {/* <div className={styles.mainFilter}> */}
        <div className={styles.topBlock}>
          <Typography className={styles.filterTitle} variant="h3" component="p">
            Фильтрация
          </Typography>
        </div>
        <div className={styles.bottomBlocks}>
          {tags.length > 0 &&
            tags.map((tag) => (
              <div key={tag.id} className={styles.block}>
                <Checkbox {...label} />
                <Typography className={styles.filterTag} component="p">
                  {tag.name}
                </Typography>
              </div>
            ))}

          <div className={styles.forCentr}>
            <Button variant="contained" size="small">
              Применить
            </Button>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default Filter;
