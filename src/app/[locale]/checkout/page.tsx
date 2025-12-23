'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const cart = useTranslations('cart');
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const steps: Step[] = ['shipping', 'payment', 'review'];
  const stepIndex = steps.indexOf(currentStep);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    const idx = steps.indexOf(currentStep);
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1]);
    }
  };

  const prevStep = () => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1]);
    }
  };

  // Order summary data
  const subtotal = 909.96;
  const shipping = 0;
  const tax = 72.80;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <motion.h1
          className="text-center mb-xl"
          style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="gradient-text">{t('title')}</span>
        </motion.h1>

        {/* Steps Indicator */}
        <motion.div
          className="flex flex-center gap-lg mb-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {steps.map((step, index) => (
            <div key={step} className="flex" style={{ alignItems: 'center' }}>
              <motion.div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  background: index <= stepIndex ? 'var(--color-accent-gradient)' : 'var(--color-bg-tertiary)',
                  color: index <= stepIndex ? 'white' : 'var(--color-text-muted)'
                }}
                animate={{ scale: index === stepIndex ? 1.1 : 1 }}
              >
                {index + 1}
              </motion.div>
              <span style={{ 
                marginLeft: 'var(--spacing-sm)', 
                color: index <= stepIndex ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                fontWeight: index === stepIndex ? 600 : 400
              }}>
                {t(step)}
              </span>
              {index < steps.length - 1 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  marginLeft: 'var(--spacing-lg)',
                  background: index < stepIndex ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)'
                }} />
              )}
            </div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-2xl)', alignItems: 'start' }}>
          {/* Form Section */}
          <motion.div
            className="glass-card"
            style={{ padding: 'var(--spacing-xl)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Shipping Form */}
            {currentStep === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--spacing-xl)' }}>
                  {t('shipping')}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('postalCode')}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {t('country')}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Form */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--spacing-xl)' }}>
                  {t('payment')}
                </h2>
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-base)'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-md)',
                          background: 'var(--color-bg-secondary)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--font-size-base)'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-md)',
                          background: 'var(--color-bg-secondary)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--font-size-base)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Review */}
            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--spacing-xl)' }}>
                  {t('review')}
                </h2>
                
                <div className="glass-card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)', background: 'var(--color-bg-secondary)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--color-accent-primary)' }}>
                    {t('shipping')}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.postalCode}<br />
                    {formData.country}
                  </p>
                </div>

                <div className="glass-card" style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-secondary)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--color-accent-primary)' }}>
                    {t('payment')}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Card ending in {formData.cardNumber.slice(-4) || '****'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-between mt-xl">
              {stepIndex > 0 ? (
                <AnimatedButton variant="secondary" onClick={prevStep}>
                  ← Back
                </AnimatedButton>
              ) : (
                <div />
              )}
              {stepIndex < steps.length - 1 ? (
                <AnimatedButton variant="primary" onClick={nextStep}>
                  Continue →
                </AnimatedButton>
              ) : (
                <AnimatedButton variant="primary">
                  {t('placeOrder')}
                </AnimatedButton>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="glass-card"
            style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '100px' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--spacing-xl)' }}>
              Order Summary
            </h2>

            {/* Items */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              {[
                { name: 'Premium Headphones', qty: 1, price: 299.99 },
                { name: 'Smart Watch', qty: 1, price: 449.99 },
                { name: 'Leather Wallet', qty: 2, price: 159.98 }
              ].map((item, i) => (
                <div key={i} className="flex flex-between" style={{ marginBottom: 'var(--spacing-sm)', fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {item.name} × {item.qty}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--spacing-lg)' }}>
              <div className="flex flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{cart('subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{cart('shipping')}</span>
                <span style={{ color: 'var(--color-success)' }}>Free</span>
              </div>
              <div className="flex flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{cart('tax')}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex flex-between" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>
                <span>{cart('total')}</span>
                <span className="gradient-text">${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
