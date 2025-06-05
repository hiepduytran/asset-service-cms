import CalendarBlank from '@/assets/svg/calendarBlank.svg'
import FirstAidKit from '@/assets/svg/FirstAidKit.svg'
import Maintenance from '@/assets/svg/maintenance.svg'
import Medal from '@/assets/svg/medal.svg'
import Note from '@/assets/svg/note.svg'
import Stack from '@/assets/svg/stack.svg'
import { Dashboard } from '@mui/icons-material'
import Image from 'next/image'
import { ReactNode } from 'react'

export interface MenuPathProps {
  name: string
  path: string
  icon?: ReactNode
  isChecked?: boolean
  children?: MenuPathProps[]
  subMenu?: MenuPathProps[]
}

export const ASS_PATH = 'assetManagement'

export const TRANSLATE = {
  COMMON: 'common',
  USAGE_STATUS: `${ASS_PATH}/usageStatus`,
  PROBLEM_CATEGORY: `${ASS_PATH}/categoryProblem`,
  PROBLEM: `${ASS_PATH}/problem`,
  PARAM_ASSET: `${ASS_PATH}/param-asset`,
  OPERATE: `${ASS_PATH}/operate`,
  REQUEST_ALLOCATION: `${ASS_PATH}/request-allocation`,
  TRACK_ALLOCATION_REQUEST: `${ASS_PATH}/track-allocation-request`,
  APPROVE_ALLOCATION_REQUEST: `${ASS_PATH}/approve-allocation-request`,
  RECOVERY: `${ASS_PATH}/recovery`,
  CONFIG: `${ASS_PATH}/config`,
  MAINTENANCE: `${ASS_PATH}/maintenance`,
  MAINTENANCE_ACCESSORY: `${ASS_PATH}/maintenance-accessory`,
  ASSET_PERIOD: `${ASS_PATH}/asset-period`,
  FIRST_PERIOD: `${ASS_PATH}/first-period`,
  MAINTENANCE_FORECASTING: `${ASS_PATH}/maintenance-forecasting`,
  ACCESSORY_DEMAND_FORECASTING: `${ASS_PATH}/accessory-demand-forecasting`,
  TRACK_MAINTENANCE_PLAN: `${ASS_PATH}/track-maintenance-plan`,
  TRACK_MAINTENANCE_PART_ALLOCATION: `${ASS_PATH}/track-maintenance-part-allocation`,
  IMPLEMENT_MAINTENANCE_PLAN: `${ASS_PATH}/implement-maintenance-plan-list`,
  CHECK_IMPLEMENT_MAINTENANCE_PLAN: `${ASS_PATH}/check-implement-maintenance-plan`,
  DECLARATION_SPARE_PARTS: `${ASS_PATH}/declarationSpareParts`,
  STANDARD_DECLARATION: `${ASS_PATH}/standardDeclaration`,
  STANDARD_APPROVAL: `${ASS_PATH}/standard-approval`,
  METHOD_DECLARATION: `${ASS_PATH}/methodDeclaration`,
  POLICY_ROLE: `${ASS_PATH}/policyRole`,
  APPROVE_CONFIG: `${ASS_PATH}/approve_config`,
  INCIDENT_LIST: `${ASS_PATH}/incidentList`,
  WEEKLY_MAINTENANCE_PLAN: `${ASS_PATH}/weeklyMaintenancePlan`,
  ANNUAL_MAINTENANCE_PLAN: `${ASS_PATH}/annualMaintenancePlan`,
  APPROVE_MAINTENANCE_PLAN: `${ASS_PATH}/approveMaintenancePlan`,
  REASON: `${ASS_PATH}/reason`,
  INITIAL_ALLOCATED_ASSETS: `${ASS_PATH}/initialAllocatedAssets`,
  ASSET_DECLARATION_CATEGORY_LIST: `${ASS_PATH}/assetDeclarationCategoryList`,
  ASSET_USE_HISTORY: `${ASS_PATH}/asset-use-history`,
  INCIDENT_LOG_LIST: `${ASS_PATH}/incident-log-list`,
  DAMAGED_ASSET_MANAGEMENT: `${ASS_PATH}/damaged-asset-management`,
  ASSET_HANDOVER: `${ASS_PATH}/asset-handover`,
  TRACK_ASSET_LIST: `${ASS_PATH}/trackAssetList`,
  INCIDENT_REPORT: `${ASS_PATH}/incidentReport`,
  SEVERITY_MANAGEMENT: `${ASS_PATH}/severity-management`,
  INCIDENT_APPROVE: `${ASS_PATH}/incident-approve`,
  JOB_DECLARATION: `${ASS_PATH}/job-declaration`,
  REPAIR_UNIT: `${ASS_PATH}/repairUnit`,
  ASSET_STATUS_MANAGEMENT: `${ASS_PATH}/asset-status-management`,
}

export const MENU_URL = {
  DASHBOARD: `/dashboard`,
  USAGE_STATUS: `/commonConfig/usageStatus`,
  PROBLEM_CATEGORY: `/commonConfig/incident/categoryProblem`,
  PROBLEM: `/commonConfig/incident/problem`,
  PARAM_ASSET: `/assetDeclaration/paramAsset`,
  OPERATE: `/operate`,
  REQUEST_ALLOCATION: `/assetDemand/allocation/request-allocation`,
  TRACK_ALLOCATION_REQUEST: `/assetDemand/allocation/track-allocation-request`,
  APPROVE_ALLOCATION_REQUEST: `/assetDemand/allocation/approve-allocation-request`,
  RECOVERY: `/assetDemand/recovery`,
  CONFIG: `/commonConfig/config`,
  MAINTENANCE: {
    SELF_MAINTENANCE: {
      STANDARD_DECLARE: `/maintenance/selfMaintenance/standardDeclare`,
      STANDARD_APPROVAL: `/maintenance/selfMaintenance/standardApproval`,
      STANDARD_FOLLOW: `/maintenance/selfMaintenance/standardFollow`,
      SELF_MAINTENANCE_FORM: `/maintenance/selfMaintenance/selfMaintenanceForm`,
      SELF_MAINTENANCE_APPROVAL: `/maintenance/selfMaintenance/selfMaintenanceApproval`,
      SELF_MAINTENANCE_FOLLOW: `/maintenance/selfMaintenance/selfMaintenanceFollow`,
      SELF_MAINTENANCE_PERFORM: `/maintenance/selfMaintenance/selfMaintenancePerform`,
      SELF_MAINTENANCE_CHECK: `/maintenance/selfMaintenance/selfMaintenanceCheck`,
      SELF_MAINTENANCE_HISTORY: `/maintenance/selfMaintenance/selfMaintenanceHistory`,
    },
  },
  MAINTENANCE_ACCESSORY: `/maintenance/config/maintenance-accessory`,
  ACCESSORY_DEMAND_FORECASTING: `/maintenance/forecast/accessory-demand-forecasting`,
  ASSET_PERIOD: `/maintenance/config/asset-period`,
  FIRST_PERIOD: `/maintenance/config/first-period`,
  MAINTENANCE_FORECASTING: `/maintenance/forecast/maintenance-forecasting`,
  TRACK_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/track-maintenance-plan`,
  TRACK_MAINTENANCE_PART_ALLOCATION: `/maintenance/plannedMaintenance/track-maintenance-part-allocation`,
  IMPLEMENT_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/implement-maintenance-plan`,
  CHECK_IMPLEMENT_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/check-implement-maintenance-plan`,
  DECLARATION_SPARE_PARTS: `/maintenance/config/declarationSpareParts`,
  STANDARD_DECLARATION: `/maintenance/config/standardDeclaration`,
  METHOD_DECLARATION: `/maintenance/config/methodDeclaration`,
  POLICY_ROLE: `/maintenance/config/policyRole`,
  APPROVE_CONFIG: `/maintenance/config/approveConfig`,
  INCIDENT_LIST: `/incidentList`,
  WEEKLY_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/weeklyMaintenancePlan`,
  ANNUAL_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/annualMaintenancePlan`,
  APPROVE_MAINTENANCE_PLAN: `/maintenance/plannedMaintenance/approveMaintenancePlan`,
  REASON: `/commonConfig/reason`,
  ASSET_DECLARATION_CATEGORY_LIST: `/assetDeclaration/assetDeclarationCategoryList`,
  INITIAL_ALLOCATED_ASSETS: `/assetDeclaration/initialAllocatedAssets`,
  ASSET_USE_HISTORY: `/allocatedAsset/asset-use-history`,
  INCIDENT_LOG_LIST: `/allocatedAsset/incident-log-list`,
  DAMAGED_ASSET_MANAGEMENT: `/allocatedAsset/damaged-asset-management`,
  ASSET_HANDOVER: `/assetDemand/asset-handover`,
  TRACK_ASSET_LIST_DEPARTMENT: `/allocatedAsset/trackAssetListDepartment`,
  TRACK_ASSET_LIST_EMPLOYEE: `/allocatedAsset/trackAssetListEmployee`,
  ALLOCATED_ASSET_LIST: `/allocatedAsset/allocatedAssetList`,
  INCIDENT_REPORT: `/incidentReport`,
  SEVERITY_MANAGEMENT: `/severityManagement`,
  ASSET_STATUS_MANAGEMENT: `/assetStatusManagement`,
  INCIDENT_APPROVE: `/incidentApprove`,
  JOB_DECLARATION: `/maintenance/config/jobDeclaration`,
  INCIDENT_HISTORY_LIST: `/incidentList/incidentHistoryList`,
  REPAIR_UNIT: `/repairUnit`,
}

export const listMenuRoutes: MenuPathProps[] = [
  {
    name: 'Trang chủ',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Theo dõi vận hành tài sản',
    path: MENU_URL.OPERATE,
    icon: <Image alt='' src={CalendarBlank} width={20} height={20} />,
  },
  {
    name: 'Báo cáo sự cố',
    path: MENU_URL.INCIDENT_REPORT,
    icon: <Image alt='' src={CalendarBlank} width={20} height={20} />,
  },
  {
    name: 'Nhu cầu tài sản',
    path: '/assetDemand',
    icon: <Image alt='' src={FirstAidKit} width={20} height={20} />,
    subMenu: [
      {
        name: 'Cấp phát tài sản',
        path: '/assetDemand/allocation',
        children: [
          {
            name: 'Yêu cầu cấp phát tài sản',
            path: MENU_URL.REQUEST_ALLOCATION,
          },
          {
            name: 'Phê duyệt yêu cầu cấp phát',
            path: MENU_URL.APPROVE_ALLOCATION_REQUEST,
          },
          {
            name: 'Theo dõi cấp phát tài sản',
            path: MENU_URL.TRACK_ALLOCATION_REQUEST,
          },
        ],
      },
      {
        name: 'Thu hồi tài sản',
        path: MENU_URL.RECOVERY,
      },
      {
        name: 'Bàn giao tài sản',
        path: MENU_URL.ASSET_HANDOVER,
      },
    ],
  },
  {
    name: 'Tài sản được cấp phát',
    path: '/allocatedAsset',
    icon: <Image alt='' src={Stack} width={19} height={19} />,
    subMenu: [
      {
        name: 'Bộ phận',
        path: MENU_URL.TRACK_ASSET_LIST_DEPARTMENT,
      },
      {
        name: 'Nhân viên',
        path: MENU_URL.TRACK_ASSET_LIST_EMPLOYEE,
      },
      {
        name: 'Danh sách tài sản đang cấp phát',
        path: MENU_URL.ALLOCATED_ASSET_LIST,
      },
      {
        name: 'Lịch sử sử dụng tài sản',
        path: MENU_URL.ASSET_USE_HISTORY,
      },
      {
        name: 'Danh sách ghi nhận sự cố',
        path: MENU_URL.INCIDENT_LOG_LIST,
      },
      {
        name: 'Quản lý tài sản hư hỏng',
        path: MENU_URL.DAMAGED_ASSET_MANAGEMENT,
      },
    ],
  },
  {
    name: 'Khai báo tài sản',
    path: '/assetDeclaration',
    icon: <Image alt='' src={Medal} width={19} height={19} />,
    subMenu: [
      {
        name: 'Tài sản đầu kỳ',
        path: MENU_URL.INITIAL_ALLOCATED_ASSETS,
      },
      {
        name: 'Danh sách tài sản',
        path: MENU_URL.ASSET_DECLARATION_CATEGORY_LIST,
      },
      {
        name: 'Theo dõi thông số tài sản',
        path: MENU_URL.PARAM_ASSET,
      },
    ],
  },
  {
    name: 'Cấu hình',
    path: '/commonConfig',
    icon: <Image alt='' src={Note} width={20} height={20} />,
    subMenu: [
      {
        name: 'Sự cố',
        path: '/commonConfig/incident',
        children: [
          {
            name: 'Danh mục sự cố',
            path: MENU_URL.PROBLEM_CATEGORY,
          },
          {
            name: 'Sự cố',
            path: MENU_URL.PROBLEM,
          },
        ],
      },
      {
        name: 'Tình trạng sử dụng',
        path: MENU_URL.USAGE_STATUS,
      },
      {
        name: 'Lý do',
        path: MENU_URL.REASON,
      },
      {
        name: 'Tính năng',
        path: MENU_URL.CONFIG,
      },
    ],
  },
  {
    name: 'Bảo dưỡng',
    path: '/maintenance',
    icon: <Image alt='' src={Maintenance} width={20} height={20} />,
    subMenu: [
      {
        name: 'Cấu hình',
        path: '/maintenance/config',
        children: [
          {
            name: 'Khai báo phụ tùng',
            path: MENU_URL.DECLARATION_SPARE_PARTS,
          },
          {
            name: 'Khai báo tiêu chuẩn',
            path: MENU_URL.STANDARD_DECLARATION,
          },
          {
            name: 'Khai báo phương pháp theo TC',
            path: MENU_URL.METHOD_DECLARATION,
          },
          {
            name: 'Khai báo công cụ bảo dưỡng',
            path: MENU_URL.MAINTENANCE_ACCESSORY,
          },
          {
            name: 'Khai báo chu kì',
            path: MENU_URL.ASSET_PERIOD,
          },
          {
            name: 'Khai báo đầu kì',
            path: MENU_URL.FIRST_PERIOD,
          },
          {
            name: 'Chính sách và vai trò',
            path: MENU_URL.POLICY_ROLE,
          },
          {
            name: 'Phê duyệt',
            path: MENU_URL.APPROVE_CONFIG,
          },
          {
            name: 'Khai báo công việc',
            path: MENU_URL.JOB_DECLARATION,
          },
        ],
      },
      {
        name: 'Dự báo',
        path: '/maintenance/forecast',
        children: [
          {
            name: 'Dự báo tài sản bảo dưỡng',
            path: MENU_URL.MAINTENANCE_FORECASTING,
          },
          {
            name: 'Dự báo nhu cầu phụ tùng',
            path: MENU_URL.ACCESSORY_DEMAND_FORECASTING,
          },
        ],
      },
      {
        name: 'Tự bảo dưỡng',
        path: '/maintenance/selfMaintenance',
        children: [
          {
            name: 'Khai báo tiêu chuẩn',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE,
          },
          {
            name: 'Phê duyệt tiêu chuẩn',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_APPROVAL,
          },
          {
            name: 'Theo dõi danh sách tiêu chuẩn',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_FOLLOW,
          },
          {
            name: 'Lập phiếu tự bảo dưỡng',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM,
          },
          {
            name: 'Phê duyệt phiếu tự BD',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE
              .SELF_MAINTENANCE_APPROVAL,
          },
          {
            name: 'Theo dõi danh sách phiếu tự BD',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FOLLOW,
          },
          {
            name: 'Thực hiện tự BD',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE
              .SELF_MAINTENANCE_PERFORM,
          },
          {
            name: 'Kiểm tra tự BD',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_CHECK,
          },
          {
            name: 'Theo dõi lịch sử tự BD',
            path: MENU_URL.MAINTENANCE.SELF_MAINTENANCE
              .SELF_MAINTENANCE_HISTORY,
          },
        ],
      },
      {
        name: 'Bảo dưỡng theo kế hoạch',
        path: '/maintenance/plannedMaintenance',
        children: [
          {
            name: 'Lập kế hoạch bảo dưỡng',
            path: MENU_URL.ANNUAL_MAINTENANCE_PLAN,
          },
          {
            name: 'Phê duyệt kế hoạch bảo dưỡng',
            path: MENU_URL.APPROVE_MAINTENANCE_PLAN,
          },
          {
            name: 'Theo dõi kế hoạch bảo dưỡng',
            path: MENU_URL.TRACK_MAINTENANCE_PLAN,
          },
          {
            name: 'Theo dõi cấp phát phụ tùng BD',
            path: MENU_URL.TRACK_MAINTENANCE_PART_ALLOCATION,
          },
          {
            name: 'Thực hiện kế hoạch BD',
            path: MENU_URL.IMPLEMENT_MAINTENANCE_PLAN,
          },
          {
            name: 'Kiểm tra thực hiện kế hoạch BD',
            path: MENU_URL.CHECK_IMPLEMENT_MAINTENANCE_PLAN,
          },
        ],
      },
    ],
  },
  {
    name: 'Quản lý tình trạng tài sản ',
    path: MENU_URL.ASSET_STATUS_MANAGEMENT,
    icon: <Image alt='' src={Maintenance} width={20} height={20} />,
  },
  {
    name: 'Quản lý mức độ nghiêm trọng',
    path: MENU_URL.SEVERITY_MANAGEMENT,
    icon: <Image alt='' src={Maintenance} width={20} height={20} />,
  },
  {
    name: 'Phê duyệt sự cố',
    path: MENU_URL.INCIDENT_APPROVE,
    icon: <Image alt='' src={Maintenance} width={20} height={20} />,
  },
  {
    name: 'Danh sách sự cố',
    path: MENU_URL.INCIDENT_LIST,
    icon: <Image alt='' src={Maintenance} width={20} height={20} />,
  },
  {
    name: 'Đơn vị sửa chữa',
    path: MENU_URL.REPAIR_UNIT,
    icon: <Image alt='' src={CalendarBlank} width={20} height={20} />,
  },
]
