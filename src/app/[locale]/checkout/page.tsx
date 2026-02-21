'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import styles from './checkout.module.css';

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const subtotal = 909.96;
  const shipping = 0;
  const tax = 72.80;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <motion.h1
          className={styles.checkoutTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="gradient-text">{t('title')}</span>
        </motion.h1>

        <motion.div
          className={styles.stepsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {steps.map((step, index) => (
            <div key={step} className={styles.stepWrapper}>
              <motion.div
                className={index <= stepIndex ? styles.stepCircleActive : styles.stepCircleInactive}
                animate={{ scale: index === stepIndex ? 1.1 : 1 }}
              >
                {index + 1}
              </motion.div>
              <span className={index <= stepIndex ? styles.stepLabelActive : styles.stepLabelInactive}>
                {t(step)}
              </span>
              {index < steps.length - 1 && (
                <div className={index < stepIndex ? styles.stepConnectorActive : styles.stepConnectorInactive} />
              )}
            </div>
          ))}
        </motion.div>

        <div className={styles.checkoutGrid}>
          <motion.div
            className={`glass-card ${styles.formCard}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentStep === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className={styles.formTitle}>{t('shipping')}</h2>
                <div className={styles.formGrid}>
                  <div>
                    <label className={styles.formLabel}>{t('firstName')}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div>
                    <label className={styles.formLabel}>{t('lastName')}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.formLabel}>{t('email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.formLabel}>{t('phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.formLabel}>{t('address')}</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div>
                    <label className={styles.formLabel}>{t('city')}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div>
                    <label className={styles.formLabel}>{t('postalCode')}</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <label className={styles.formLabel}>{t('country')}</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className={styles.formTitle}>{t('payment')}</h2>
                <div className={styles.formGridSingle}>
                  <div>
                    <label className={styles.formLabel}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div>
                    <label className={styles.formLabel}>Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.formLabel}>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label className={styles.formLabel}>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className={styles.formTitle}>{t('review')}</h2>

                <div className={`glass-card ${styles.reviewCard}`}>
                  <h3 className={styles.reviewTitle}>{t('shipping')}</h3>
                  <p className={styles.reviewText}>
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.postalCode}<br />
                    {formData.country}
                  </p>
                </div>

                <div className={`glass-card ${styles.reviewCard}`}>
                  <h3 className={styles.reviewTitle}>{t('payment')}</h3>
                  <p className={styles.reviewText}>
                    Card ending in {formData.cardNumber.slice(-4) || '****'}
                  </p>
                </div>
              </motion.div>
            )}

            <div className={styles.navButtons}>
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

          <motion.div
            className={`glass-card ${styles.orderSummary}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={styles.orderSummaryTitle}>Order Summary</h2>

            <div className={styles.orderItems}>
              {[
                { name: 'Premium Headphones', qty: 1, price: 299.99 },
                { name: 'Smart Watch', qty: 1, price: 449.99 },
                { name: 'Leather Wallet', qty: 2, price: 159.98 }
              ].map((item, i) => (
                <div key={i} className={`flex flex-between ${styles.orderItem}`}>
                  <span className={styles.orderItemName}>
                    {item.name} × {item.qty}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.orderDivider}>
              <div className={`flex flex-between ${styles.orderRow}`}>
                <span className={styles.orderRowLabel}>{cart('subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={`flex flex-between ${styles.orderRow}`}>
                <span className={styles.orderRowLabel}>{cart('shipping')}</span>
                <span style={{ color: 'var(--color-success)' }}>Free</span>
              </div>
              <div className={`flex flex-between ${styles.orderRow}`} style={{ marginBottom: 'var(--spacing-lg)' }}>
                <span className={styles.orderRowLabel}>{cart('tax')}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={`flex flex-between ${styles.orderTotal}`}>
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
