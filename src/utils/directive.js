import { authDirective } from '/@/utils/authDirective';
import { wavesDirective, dragDirective ,debounceDirective} from '/@/utils/customDirective';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 * @methods dragDirective 自定义拖动指令，用法：v-drag
 * @methods debounceDirective 防抖指令，用法：v-debounce
 * 
 */
export function directive(app) {
  // 用户权限指令
  authDirective(app);
  // 按钮波浪指令
  wavesDirective(app);
  // 自定义拖动指令
  dragDirective(app);
  // 防抖指令
  debounceDirective(app);
}

