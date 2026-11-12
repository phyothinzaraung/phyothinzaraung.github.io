import type { LearningStatus } from './roadmap'

type RoboticsMilestone = {
  id: string
  title: string
  status: LearningStatus
  check: string
  evidence?: { label: string; href: string }
}

export const roboticsMilestones: RoboticsMilestone[] = [
  {
    id: 'orientation',
    title: 'Explore robotics software fundamentals',
    status: 'Learning',
    check: 'Write a short note on how sensing, decision-making, and control fit together.',
  },
  {
    id: 'languages',
    title: 'Practice Python and C++',
    status: 'Planned',
    check: 'Build a small program in each language with a repeatable build or test command.',
  },
  {
    id: 'workspace',
    title: 'Set up a ROS 2 workspace',
    status: 'Planned',
    check: 'Build a package locally and document how to reproduce the setup.',
  },
  {
    id: 'messaging',
    title: 'Connect ROS 2 nodes',
    status: 'Planned',
    check: 'Run a publisher and subscriber and inspect the messages with the ROS 2 CLI.',
  },
  {
    id: 'transforms',
    title: 'Work with coordinate frames',
    status: 'Planned',
    check: 'Compute a pose transform and verify the result with tf2.',
  },
  {
    id: 'simulation',
    title: 'Run a simulation exercise',
    status: 'Planned',
    check: 'Launch a simulated robot and document one command and the resulting topic data.',
  },
]
