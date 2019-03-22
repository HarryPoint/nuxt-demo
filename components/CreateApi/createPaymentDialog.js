import Vue from 'vue'
import PaymentDialog from '@/components/dialog/PaymentDialog'
import { createAPI } from 'cube-ui'

createAPI(Vue, PaymentDialog, ['confirm', 'select', 'hide'], true)
