import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  id: string;
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  badge?: 'New' | 'Coming soon';
};

const FeatureList: FeatureItem[] = [
  {
    id: 'customizable-workspaces',
    title: 'Customizable Workspaces',
    Svg: require('@site/static/img/undraw_dev-environment_n5by.svg').default,
    description: (
      <>
        Define projects, issues, and custom fields that match your team’s workflow. Add new field
        types or relations without database migrations.
      </>
    ),
  },
  {
    id: 'on-premise-and-self-updating',
    title: 'On-Premise and Self-Updating',
    Svg: require('@site/static/img/undraw_server-status_7viz.svg').default,
    description: (
      <>
        Run entirely on your own infrastructure with a built-in updater that downloads signed
        releases, applies migrations, and verifies health automatically.
      </>
    ),
  },
  {
    id: 'fast-and-scalable-by-design',
    title: 'Fast and Scalable by Design',
    Svg: require('@site/static/img/undraw_app-benchmarks_ls0m.svg').default,
    description: (
      <>
        Optimized for large datasets using keyset pagination, indexed JSONB fields, and virtualized
        tables for smooth interaction even with thousands of items.
      </>
    ),
  },
];

function Badge({ label }: Readonly<{ label: NonNullable<FeatureItem['badge']> }>) {
  return <span className={styles.badge}>{label}</span>;
}

function Feature({ title, Svg, description, badge }: Readonly<FeatureItem>) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          {title} {badge && <Badge label={badge} />}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
