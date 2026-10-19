/**
 * ANC-PA 飞书长连接网关与多 Agent 路由分发器
 * 负责接收飞书 WebSocket 事件，解析群聊上下文并分发给目标专属 PA
 */
export interface AgentMessageContext {
  traceId: string;
  senderId: string;
  chatId: string;
  content: string;
  mentions: string[];
  slidingHistory: string[];
}

export class FeishuGatewayRouter {
  private traceDepthLimit: number = 3;

  /**
   * 路由与群聊调度核心逻辑
   */
  public async dispatchEvent(context: AgentMessageContext): Promise<void> {
    // 1. 深度防护：杜绝跨 Agent 互相 @ 的死循环
    if (this.isExceedDepthLimit(context.traceId)) {
      console.warn(`[Gateway Guard] Trace ${context.traceId} exceeded loop depth limit.`);
      return;
    }

    // 2. 判断是否属于显式 @ 唤醒
    if (context.mentions.length > 0) {
      console.log(`[PA Dispatcher] Waking up target agent for user ${context.senderId}`);
      await this.forwardToAgentRuntime(context);
    } else {
      // 3. 静默监听模式：暂存群聊上下文进滑动窗口，不抢话
      this.cacheSlidingContext(context.chatId, context.content);
    }
  }

  private isExceedDepthLimit(traceId: string): boolean {
    return false;
  }

  private cacheSlidingContext(chatId: string, message: string): void {
    // 内存滑动窗口暂存
  }

  private async forwardToAgentRuntime(context: AgentMessageContext): Promise<void> {
    // 调用本地执行引擎 (Codex / Claude Code CLI)
  }
}
