import AuditLog from './auditLog.model.js';
import mongoose from 'mongoose';

interface AuditLogOptions {
  adminId: string | mongoose.Types.ObjectId;
  actionType: string;
  targetId?: string | mongoose.Types.ObjectId;
  targetType?: string;
  metaData?: Record<string, any>;
  ipAddress?: string;
}

/**
 * Global application tracking utility.
 * Use this anywhere in the codebase to record an action.
 */
export const logAdminAction = async (options: AuditLogOptions) => {
  try {
    const log = new AuditLog({
      adminId: options.adminId,
      actionType: options.actionType,
      targetId: options.targetId,
      targetType: options.targetType,
      metaData: options.metaData,
      ipAddress: options.ipAddress
    });

    await log.save();
    return true;
  } catch (error) {
    // CRITICAL: We do NOT throw errors here. 
    // If the logging database is momentarily down, it should NOT crash the main application's user flow.
    console.error('🚨 Critical Audit Logging Failure:', error);
    return false;
  }
};
