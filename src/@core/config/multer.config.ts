import { join } from 'path';
import * as xhelper from 'xhelper';

export const MULTER_CONFIG = {
  destination: (req: any, file: any, cb: any) => {
    cb(null, join(__dirname, '../../../', 'uploads'));
  },
  filename: (req: any, file: any, cb: any) => {
    delete req.headers.authorization;

    const randomNumber = xhelper.leadingZeroes(`${Math.round(Math.random() * 100)}`, 3);
    const mimetype = file.mimetype.split('/');
    const { user, community } = req.preFetched;
    const type = mimetype[0];
    let ext = '';

    if (type === 'video') {
      ext = `.${mimetype[1]}`;
    }

    const filename = `${randomNumber}${(user || community)._id}${Date.now()}`.toUpperCase() + ext;
    cb(null, filename);
  },
};
