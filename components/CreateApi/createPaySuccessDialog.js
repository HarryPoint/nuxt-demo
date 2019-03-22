import Vue from 'vue'
import PaySuccessDialog from '@/components/dialog/PaySuccessDialog'
import { createAPI } from 'cube-ui'

createAPI(Vue, PaySuccessDialog, ['maskClick'], true)
