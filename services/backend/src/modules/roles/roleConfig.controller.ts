import { Request, Response } from 'express';
import RoleConfig from './roleConfig.model.js';

const defaultMatrix = [
  { module: "Users", permissions: { view: false, create: false, edit: false, delete: false } },
  { module: "Courses", permissions: { view: false, create: false, edit: false, delete: false } },
  { module: "Payments", permissions: { view: false, create: false, edit: false, delete: false } },
  { module: "Reports", permissions: { view: false, create: false, edit: false, delete: false } },
  { module: "Support", permissions: { view: false, create: false, edit: false, delete: false } },
];

export const getRoleConfig = async (req: Request, res: Response) => {
  const { roleName } = req.query;

  if (!roleName) {
    return res.status(400).json({ error: 'roleName query parameter is required' });
  }

  // Super Admin inherently returns true for all permissions, no db query needed
  if (roleName === 'Super Admin' || roleName === 'super-admin') {
    const superMatrix = defaultMatrix.map(m => ({
      ...m,
      permissions: { view: true, create: true, edit: true, delete: true }
    }));
    return res.status(200).json({ roleName, matrix: superMatrix });
  }

  const normalizedRole = (roleName as string).toLowerCase();

  let config = await RoleConfig.findOne({ roleName: normalizedRole });

  // If this role hasn't been configured yet, generate a default template
  if (!config) {
    config = await RoleConfig.create({
      roleName: normalizedRole,
      matrix: defaultMatrix
    });
  }

  res.status(200).json(config);
};

export const updateRoleConfig = async (req: Request, res: Response) => {
  const { roleName, matrix } = req.body;

  if (!roleName || !matrix) {
    return res.status(400).json({ error: 'roleName and matrix are required' });
  }

  if (roleName === 'Super Admin' || roleName === 'super-admin') {
    return res.status(403).json({ error: 'Super Admin permissions are immutable' });
  }

  const normalizedRole = roleName.toLowerCase();

  const config = await RoleConfig.findOneAndUpdate(
    { roleName: normalizedRole },
    { matrix },
    { new: true, upsert: true }
  );

  res.status(200).json(config);
};

export default {
  getRoleConfig,
  updateRoleConfig
};
