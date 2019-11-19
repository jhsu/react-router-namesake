import * as React from 'react';
import * as H from 'history';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string | string[];
    replace?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
}

export class Link extends React.Component<LinkProps, any> {}
