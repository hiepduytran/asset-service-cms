import { Switch, Typography } from '@mui/material'
import { useDemoMode } from '@/components/layouts/DemoMode/context'
import { useRouter } from 'next/router'
import { MENU_URL } from '@/routes'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

export const DemoMode = () => {

  const router = useRouter()
  const { isDemoMode, toggleDemoMode } = useDemoMode()


  console.log('toggleDemoMode', toggleDemoMode)
  return (

    <div>
      <div className="flex items-center justify-between cursor-pointer group px-8">
        <div className="flex gap-4 items-center">
          <OndemandVideoIcon
            fontSize="small"
            className="group-hover:text-[#0078D4]"
          />
          <Typography variant="body2" className="group-hover:text-[#0078D4]">
            Demo Mode
          </Typography>
        </div>

        <Switch checked={isDemoMode} onClick={(e) => {
          toggleDemoMode(!isDemoMode)
          router.push(MENU_URL.DASHBOARD)
          // router.reload()
        }} />
      </div>


    </div>


  )
}

