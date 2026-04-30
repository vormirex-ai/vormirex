import mongoose, { Document, Schema } from 'mongoose';

export interface IPermissionMatrix {
  module: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface IRoleConfig extends Document {
  roleName: 'admin' | 'editor'; // super-admin inherently bypasses config rules
  matrix: IPermissionMatrix[];
}

const roleConfigSchema = new Schema<IRoleConfig>(
  {
    roleName: { 
      type: String, 
      required: true, 
      unique: true, 
      enum: ['admin', 'editor'] 
    },
    matrix: [
      {
        module: { type: String, required: true },
        permissions: {
          view: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          edit: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IRoleConfig>('RoleConfig', roleConfigSchema);
