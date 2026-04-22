import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  actionType: string;
  targetId?: mongoose.Types.ObjectId;
  targetType?: string;
  metaData?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    // The Actor Profile
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    
    // The Exact Internal Action Traded
    actionType: {
      type: String,
      required: true,
      index: true
    },
    
    // Who was affected (Optional, as some actions are global)
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    targetType: {
      type: String, // e.g., 'User', 'Course', 'Settings'
    },
    
    // Extensible properties for precise changes
    metaData: {
      type: Schema.Types.Mixed, 
    },
    
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

// Deep Indexing to ensure the RecentLogs dashboard loads with zero latency
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
export default AuditLog;
