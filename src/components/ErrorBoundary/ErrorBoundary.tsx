import * as React from 'react';

import { ErrorContainer } from './styled';

type Props = {
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  }

  render() {
    return this.state.hasError ? <ErrorContainer>Что-то пошло не так.</ErrorContainer> : this.props.children;
  }
}
