module OmniHelper

  def omni_provider(provider, json = false)
    res =  SiteSetting.omni_provider(provider)
    json ? res.to_json : res
  end
  def omni_client(provider)
    prepare_pr(provider,:client)
  end

  def omni_redirect(provider)
    prepare_pr(provider,:redirect_uri)
  end

  def omni_scope(provider)
    prepare_pr(provider,:scope).join(",")
  end

  def prepare_pr(provider,data)
    pr = omni_provider(provider)
    pr ? pr[data] : pr
  end


end