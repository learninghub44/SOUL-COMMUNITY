import CheckoutContent from './CheckoutContent';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  return <CheckoutContent />;
}
