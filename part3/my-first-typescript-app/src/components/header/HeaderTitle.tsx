import React from "react"
import { Typography } from "../atoms/Typography"

export const HeaderTitle: React.FC<{
  title: string
}> = (props) => {
  return (
    <Typography fontSize={18}>{props.title}</Typography>
  )
}