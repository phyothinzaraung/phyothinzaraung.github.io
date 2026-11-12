import type { LearningStatus } from './roadmap'

type RoboticsProject = {
  id: string
  kind: 'simulation' | 'project'
  title: string
  description: string
  status: LearningStatus
  tools?: string[]
  link?: { label: string; href: string }
}

export const roboticsProjects: RoboticsProject[] = [
  {
    id: 'first-simulation-exercise',
    kind: 'simulation',
    title: 'First ROS 2 simulation exercise',
    description: 'Launch a sample robot in Gazebo, send a motion command, and record the response from a ROS 2 topic.',
    status: 'Planned',
    tools: ['ROS 2', 'Gazebo'],
  },
]
